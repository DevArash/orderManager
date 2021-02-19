import { Bson } from '../../../../db.ts';
import { centers, Center, RCenter } from '../../../schemas/mod.ts';

import { throwError } from '../../../utils/mod.ts';
import { makeProjections } from '../../../utils/makeProjections.ts';

type GetCenterInput = { _id: Bson.ObjectID; get: RCenter };
type GetCenterFn = ({ _id, get }: GetCenterInput) => Promise<Center>;

export const getCenter: GetCenterFn = async ({ _id, get }) => {
	const projection = makeProjections(get, ['country', 'state'], []);
	const foundCenter = await centers.findOne({ _id }, { projection });
	const doRelation = async (city: Center, get: RCenter) => {
		if (get.center && get.country.states)
			// if comming from embedded -2 if coming from not embedded -1
			city.country.states = await getStates({
				filter: { country: city._id },
				getObj: get.country.states,
			});
		if (get.state && get.state.cities)
			city.state.cities = await getCities({
				filter: { state: { _id: city.state._id } },
				getObj: get.state.cities,
			});
		return city;
	};
	return foundCenter
		? await doRelation(foundCenter, get)
		: throwError('Could not find any center with the provided details');
};
