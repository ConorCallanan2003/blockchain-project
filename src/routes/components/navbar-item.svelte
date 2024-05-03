<script lang="ts">
	export let name: string;
	export let path: string;
</script>

<a href={path} class="px-6 py-2 group hover:bg-gray-800 hover:scale-105 duration-200 rounded-lg">
	<p class="font-medium text-black group-hover:text-white text-xl duration-200">{name}</p>
</a>
