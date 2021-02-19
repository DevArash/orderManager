import { ld } from "https://deno.land/x/deno_lodash/mod.ts";
import { Bson } from "../../db.ts";

/**
 * @function
 * ThisFunction get the documents and the desired field, extract the IDs of desired field and make them unique
 * @param
 * foundedModels
 * foundedModels is an array of documents that has been found
 * @param
 * field
 * field is the name of desired field of the document
 */
export const getUniqIds = (foundedModels: any[], field: string) => {
  const fieldIds = foundedModels.map(model => model[field]);
  const uniq = ld
    .uniqWith([].concat.apply([], fieldIds), ld.isEqual)
    .filter(id => id);
  return uniq;
};

interface IRelatedSchema {
  filter: Bson.Document;
  getObj: any;
  deps?: number;
}

export const makeLookUp = async <C>(
  foundedModels: any[],
  relatedSchema: ({ filter, getObj, deps }: IRelatedSchema) => Promise<C[]>,
  field: string,
  getObj: any,
  deps?: number,
) => {
  const uniqIds = getUniqIds(foundedModels, field);

  const filterDoc: IRelatedSchema = {
    filter: { _id: { $in: uniqIds } },
    getObj,
  };
  if (deps) filterDoc.deps = deps;
  const relatedPopulate = await relatedSchema(filterDoc);

  return foundedModels.map(model => {
    model[field]
      ? Array.isArray(model[field])
        ? (model[field] = relatedPopulate.filter((mo: any) => {
            return (
              model[field]
                .map((id: Bson.ObjectID) => id!.toString())
                .indexOf(mo._id.toString()) > -1
            );
          }))
        : (model[field] = relatedPopulate.find((mo: any) => {
            return mo._id.toString() === model[field].toString();
          }))
      : null;
    return model;
  });
};