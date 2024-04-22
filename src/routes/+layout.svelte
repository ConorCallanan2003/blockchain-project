<script>
	import '../app.css';
	import Navbar from './components/navbar.svelte';
</script>

<div class="app">
	<main>

<section>
	<div class="w-full h-screen px-4 py-10 flex flex-col justify-start items-center">
		<Navbar/>
		<slot />
	</div>


</section>
	</main>

</div>

