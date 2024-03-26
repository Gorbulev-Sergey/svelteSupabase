<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Country } from '$lib';
	import { supabase } from '$lib/scripts/supabase.js';
	import ModalEdit from '$lib/ModalEdit.svelte';

	export let data;
	let newCountry: Country = new Country();
	async function addCountry(country: Country) {
		await supabase.from('countries').insert({ name: country.name });
		newCountry = new Country();
		invalidateAll();
	}
	async function removeCountry(id: Number) {
		await supabase.from('countries').delete().eq('id', id);
		invalidateAll();
	}
	async function editCountry(country: Country) {
		await supabase.from('countries').update(country).eq('id', country.id);
		newCountry = new Country();
		invalidateAll();
	}
	let sortByName = false;
	$: countries = sortByName ? [...data.countries].sort((c1, c2) => c1.name.localeCompare(c2.name.toString())) : [...data.countries].sort((c1, c2) => Number(c1.id) - Number(c2.id));
	let enableEdit = false;

	let showModal = false;
	let selectedCountry: Country = new Country();
</script>

<h2 class="text-nowrap">Страны</h2>

<div class="d-flex align-items-center gap-2 text-nowrap w-100">
	<div class="input-group w-50">
		<input
			class="form-control"
			bind:value={newCountry.name}
			placeholder="Название страны"
			on:keydown={async (e) => {
				if (e.key == 'Enter') {
					await addCountry(newCountry);
				}
			}}
		/>
		{#if !enableEdit}
			<button class="btn btn-dark text-light" on:click={async () => await addCountry(newCountry)}>Добавить страну</button>
		{:else}
			<button
				class="btn btn-light text-dark border"
				on:click={() => {
					newCountry = new Country();
					enableEdit = false;
				}}>Отмена</button
			>
			<button class="btn btn-dark text-light" on:click={async () => await editCountry(newCountry)}>Сохранить изменения</button>
		{/if}
	</div>
	<div class="flex-grow-1 d-flex align-items-center justify-content-end gap-2">
		<div>Сортировать:</div>
		<button
			class="btn btn-sm btn-dark"
			on:click={() => {
				sortByName = !sortByName;
			}}>{sortByName ? 'по имени' : 'по id'}</button
		>
	</div>
</div>

<div class="bg-light rounded w-100 d-flex flex-column gap-1">
	{#each countries as item}
		<div class="d-flex align-items-center gap-1 item px-2 rounded">
			<div class="flex-grow-1 d-flex align-items-center gap-1">
				<div class="badge bg-dark text-light">{item.id}</div>
				<div>{item.name}</div>
			</div>
			<button
				class="btn btn-sm text-dark"
				title="Редактировать"
				on:click={() => {
					newCountry = item;
					enableEdit = true;
				}}
			>
				<i class="fa-solid fa-pencil"></i>
			</button>
			<button class="btn btn-sm text-danger" title="Удалить" on:click={async () => await removeCountry(item.id)}>
				<i class="fa-solid fa-trash"></i>
			</button>
			<button
				class="btn btn-sm text-dark"
				on:click={() => {
					selectedCountry = item;
					showModal = true;
				}}>Редактировать</button
			>
		</div>
	{/each}
</div>

<ModalEdit bind:showModal title="Редактировать страну" item={selectedCountry} />

<style>
	.item:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
