// Import External dependencies
import FastestValidator from 'https://cdn.pika.dev/fastest-validator@^1.8.0';

// Import Database
import { Bson } from '../../../db.ts';
import { Center, centerSelectable, RCenter } from '../../schemas/mod.ts';
import { throwError } from '../../utils/index.ts';

const v = new FastestValidator();
const check = v.compile({
	details: {
		type: 'object',
		props: {
			set: {
				type: 'object',
				props: {
					name: { type: 'string' },
					owner: { type: 'object', props: {} },
					address: { type: 'string' },
					phone: { type: 'number' },
					servingStyle: { type: 'string' },
				},
			},
			get: {
				type: 'object',
				optional: true,
				props: centerSelectable(1),
			},
		},
	},
});

type detailsSet = {
	name: string;
	owner: {};
	address: string;
	phone: number;
	servingStyle: string;
};

interface addingCenterDetails {
	set: detailsSet;
	get: RCenter;
}

type AddingCenter = (details: addingCenterDetails) => Promise<Partial<Center>>;

export const addingCenter: AddingCenter = async (details) => {
	console.log('Request Details', details);
	const detailsIsRight = check({ details });

	detailsIsRight !== true && throwError(detailsIsRight[0].message);

	const {
		set: {
			name,
			owner: {},
			address,
			phone,
			servingStyle,
		},
		get,
	} = details;

	const createdCity = await cities.insertOne({
		name,
		owner: {},
		address,
		phone,
		servingStyle,
	});

	console.log(createdCity);
	const ob = new Bson.ObjectID(createdCity);
	return get ? getCenter({ _id: ob, get }) : { _id: ob };
};
