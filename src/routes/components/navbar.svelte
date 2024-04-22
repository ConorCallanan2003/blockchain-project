<script>
	import NavbarItem from './navbar-item.svelte';
</script>

<div class="w-full px-8 h-12 flex justify-between items-center">
	<h1 class="font-bold text-2xl select-none cursor-pointer">Web3 Bullshit™</h1>
	<div class="flex gap-6 [&_*]:select-none [&_*]:cursor-pointer justify-between items-center">
		<NavbarItem name="Home" path="/" />
		<NavbarItem name="Buy" path="/buy" />
		<NavbarItem name="Sell" path="/sell" />
		<NavbarItem name="Balance" path="/balance" />
	</div>
</div>
