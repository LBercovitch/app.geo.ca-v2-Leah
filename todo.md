# To Do

- [] we will have to update to sst-ion. however, it is not yet complete enought for sveltekit. this will be revisited later.
- [] fix x of y datasets off by one error on last record.
- [] switch search layout to grid for precise control on filter/results sizing.
- [] hide next page icon when not relevant.
- [] switch to use a single s3 bucket.
- [] handle deletion from hnap.
- [] bbox based spatial filtering.
- [] add filtering/custom collections to favorites
- [] refresh tokens automatically.
- [] add favorited searches. (just url link since url holds state).

# Backlog

- [] shorten page count based on total result count
- [] add icons for filter, search
- [] spatial filter
- [] bug: map initialisation makes the view record button disapear. this css property is the culprit: filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
- [] fix any bug related to geoview. talk to johan about returning the object(self) on init. this would likely fix the issue. this can potentially be circumvente by setting configuration json in a variable.
- [] reproduce look from https://xd.adobe.com/view/e68f1fe5-78c9-4531-67f4-1601b12abae3-90be/specs/

