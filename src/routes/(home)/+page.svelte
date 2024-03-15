<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabase } from '$lib/scripts/supabase.js';

	export let data;
	let newCountry = '';
	async function addCountry(country: String) {
		await supabase.from('countries').insert({ name: country });
		newCountry = '';
		invalidateAll();
	}
	async function removeCountry(id: Number) {
		await supabase.from('countries').delete().eq('id', id);
		invalidateAll();
	}
	let sortByName = false;
	$: countries = sortByName
		? [...data.countries].sort((c1, c2) => c1.name.localeCompare(c2.name.toString()))
		: [...data.countries].sort((c1, c2) => Number(c1.id) - Number(c2.id));
</script>

<h2 class="text-nowrap">Страны</h2>

<div class="d-flex align-items-center gap-2 text-nowrap w-100">
	<div class="input-group w-50">
		<input
			class="form-control"
			bind:value={newCountry}
			placeholder="Название страны"
			on:keydown={async (e) => {
				if (e.key == 'Enter') {
					await addCountry(newCountry);
				}
			}}
		/>
		<button class="btn btn-dark text-light" on:click={async () => await addCountry(newCountry)}
			>Добавить страну</button
		>
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

<div class="bg-light rounded p-3 w-100 d-flex flex-column gap-1">
	{#each countries as item}
		<div class="d-flex align-items-center gap-1">
			<div class="flex-grow-1 d-flex align-items-center gap-1">
				<div class="badge bg-dark text-light">{item.id}</div>
				<div>{item.name}</div>
			</div>
			<button
				class="btn btn-sm text-danger"
				title="Удалить"
				on:click={async () => await removeCountry(item.id)}
			>
				<i class="fa-solid fa-trash"></i>
			</button>
		</div>
	{/each}
</div>
