<script lang="ts">
    export let name: string;
    export let path: string;
</script>

<div class="px-6 py-2 group hover:bg-gray-800 hover:scale-105 duration-200 rounded-lg">
    <a href={path} class="font-medium text-black group-hover:text-white text-xl duration-200">{name}</a>
</div>