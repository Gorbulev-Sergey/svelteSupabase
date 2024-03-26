<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Country } from '$lib';
	import { supabase } from './scripts/supabase';

	export let showModal: Boolean; // boolean
	export let item: Country;
	export let title: String = '';

	let dialog: HTMLDialogElement; // HTMLDialogElement
	$: if (dialog && showModal) dialog.showModal();

	async function editCountry(country: Country) {
		await supabase.from('countries').update(country).eq('id', country.id);
		invalidateAll();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} class="bg-light text-dark p-3 rounded border-0" on:close={() => (showModal = false)}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation class="d-flex flex-column gap-3">
		<h5 class="mb-0 text-center">{title}</h5>
		<div class="input-group">
			<input
				class="form-control"
				bind:value={item.name}
				placeholder="Название страны"
				on:keydown={async (e) => {
					if (e.key == 'Enter') {
					}
				}}
			/>
		</div>
		<div class="d-flex align-items-center justify-content-between gap-1">
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus class="btn btn-light text-dark" on:click={() => dialog.close()}>Отмена</button>
			<button
				class="btn btn-dark text-light"
				on:click={async () => {
					await editCountry(item).then(() => dialog.close());
				}}>Сохранить изменения</button
			>
		</div>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
