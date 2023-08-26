<script lang="ts">
	import { wallpaperSt } from '$lib/store';
    import type { PageData } from './$types';
    
    export let data: PageData;

    $: $wallpaperSt = data.currentBoard.wallpaper
</script>


{#each Array(8) as _}
        <div class="h-[200px] w-[300px] bg-muted   flex-shrink-0">

        </div>
      {/each}
