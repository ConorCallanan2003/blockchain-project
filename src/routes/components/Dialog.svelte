<script>
	export let dialog;
</script>

<dialog
	class="w-[600px] p-4 rounded-2xl bg-white border-2 border-gray-200 box-shadow-3xl"
	bind:this={dialog}
	on:close
>
	<slot />
</dialog>
