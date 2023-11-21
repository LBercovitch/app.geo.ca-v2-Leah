import type { PageServerLoad } from './$types';
import { getUserData } from '$lib/db/user.ts';
import { removeFromMapCart } from '$lib/actions.ts';
import { sanitize } from '$lib/utils/data-sanitization/geocore-result.ts';

export const load: PageServerLoad = async ({ fetch, params, url, cookies }) => {
	let response = [];
	let userData;
	let sanitizedResults;

	try {
		userData = await getUserData(cookies);
	} catch (e) {
		console.error('error fetching user data in records: \n', e);
	}

	try {
		response = await getRecords(userData.Item.mapCart, params.lang, fetch);
	} catch (e) {
		console.error('error fetching records: \n', e);
	}

	let results = [];
	try {
		results = await response;
		sanitizedResults = sanitize(results, params.lang);
	} catch (e) {
		console.error('error fetching records: \n', e);
		results = [];
	}

	return {
		lang: params.lang,
		t_title: params.lang == 'en-ca' ? 'Favorites' : 'Favoris',
		results: sanitizedResults,
		userData: userData.Item
	};
};

function getRecord(id, lang, fetch) {
	const url = new URL('https://geocore.api.geo.ca/id');
	const params = {
		id: id,
		lang: lang.split('-')[0]
	};
	url.search = new URLSearchParams(params).toString();
	return fetch(url);
}

async function getRecords(idIterator, lang, fetch) {
	let promises = [];

	for (const id of idIterator) {
		promises.push(getRecord(id, lang, fetch));
	}

	const results = await Promise.all(promises);
	const values = [...results];

	let ret = await Promise.all(
		values.map(async (v) => {
			try {
				const contents = await v.json();
				if (contents.Items[0]) return contents.Items[0];
			} catch {
				(error) => console.log(error);
			}
		})
	);
	return ret;
}

export const actions = {
	removeFromMapCart: removeFromMapCart
} satisfies Actions;
