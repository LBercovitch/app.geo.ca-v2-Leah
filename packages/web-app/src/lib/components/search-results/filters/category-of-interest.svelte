<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { categoryOfInterest, updateCategoryOfInterest } from '$lib/components/search-results/filters/store';
  import SelectCustomized from '$lib/components/select-customized/select-customized.svelte';
  import type { FilterItem } from '$lib/components/search-results/filters/filter-types.d.ts';
  import type { SelectOption } from '$lib/components/select-customized/selected-types.d.ts';

  export let tempNumFilters: number;

  // TODO: Get full list of categories
  const categories = $page.data.categories;
  let selected: SelectOption | null = null;
  let categoryStoreVal: string | null = null;

  onMount(() => {
    init();
    categoryOfInterest.subscribe((value) => {
      let category = findCategory(value);
      if (selected != category) {
        changeSelection(category);
      }
      categoryStoreVal = value;
    });
  });

  /************* Translations ***************/
  const translations = $page.data.t;
  const categoryOfInterestText = translations?.categoryOfInterest ?
    translations["categoryOfInterest"] : "Select Category of Interest";
  const categorySelectDefautText = translations?.categorySelectDefaut ?
    translations["categorySelectDefaut"] : "Select a Category...";

  /************* Filter Data ***************/
  const categoriesKey = 'category-of-interest';

  function init() {
    let selectedValue = $page.url.searchParams.get(categoriesKey);
    let selectedCategory = findCategory(selectedValue);
    if (selectedCategory) {
      tempNumFilters = tempNumFilters + 1;
      selected = selectedCategory;
      updateCategoryOfInterest(selected?.value ?? null);
    }
	}

  function findCategory(categoryName: string | null) {
    return categories.find((x: FilterItem) => x.value == categoryName) ?? null;
  }

  function changeSelection(newSelection: SelectOption | null) {
    if (!categoryStoreVal && newSelection) {
      tempNumFilters = tempNumFilters + 1;
    } else if (categoryStoreVal && !newSelection) {
      tempNumFilters = tempNumFilters - 1;
    }
    selected = newSelection;
  }

  /************* Handlers ***************/
  function handleCategoryOfInterestChange(event: CustomEvent) {
    changeSelection(event.detail);
    updateCategoryOfInterest(selected?.value ?? null);
  }
</script>

<div class="w-full">
  <h3 class="font-custom-style-h3 mb-5">
    {categoryOfInterestText}
  </h3>
  <div class="w-full lg:w-[60%]">
    <SelectCustomized
      optionsData={categories} selectId={"categories-of-interest"} buttonClasses={"button-4"}
      dropDownColor={"#002E62"} removableSelection={true} defaultLabel={categorySelectDefautText}
      bind:selected={selected} on:selectedChange={handleCategoryOfInterestChange}
    />
  </div>
</div>
