<script lang="ts">
	import { sidebar, changeBoardName } from '$lib/store';
	import {
		Check,
		ChevronLeft,
		ChevronRight,
		ListFilter,
		MoreHorizontal,
		Plus
	} from 'lucide-svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';

	const wallpapers = [
		'https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
		'https://images.unsplash.com/photo-1692356573087-00b545ac4694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
		'https://images.unsplash.com/photo-1692312482674-a80d2f4278d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
		'https://images.unsplash.com/photo-1682128281178-24b8b96c4c3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60'
	];
	const colors = [
		' radial-gradient( circle 311px at 8.6% 27.9%,  rgba(62,147,252,0.57) 12.9%, rgba(239,183,192,0.44) 91.2% )',
		' radial-gradient( circle farthest-corner at 17.1% 22.8%,  rgba(226,24,24,1) 0%, rgba(160,6,6,1) 90% )',
		' radial-gradient( circle farthest-corner at 10% 20%,  rgba(237,3,32,0.87) 20.8%, rgba(242,121,1,0.84) 74.4% )',
		' linear-gradient( 68.4deg,  rgba(99,251,215,1) -0.4%, rgba(5,222,250,1) 100.2% )',
		' linear-gradient( 134.6deg,  rgba(201,37,107,1) 15.4%, rgba(116,16,124,1) 74.7% )',
		'radial-gradient( circle farthest-corner at 10% 20%,  rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90% )'
	];

	let sortBoard = 'alphabetically';
	let boardName: string = 'learn';
	let boardNameEl: HTMLHeadingElement;
	let boardNameWidth: number;
	let boardNameInput: HTMLInputElement;

	let wallpapersWrapper: HTMLUListElement;
	let colorsWrapper: HTMLUListElement;

	let wallpaper = `url(${wallpapers[0]})`;
	function getWallpaper(e: Event) {
		const el = e.target as HTMLButtonElement;
		if (el instanceof HTMLButtonElement) {
			const computeStyle = window.getComputedStyle(el);
			wallpaper = computeStyle.getPropertyValue('background-image');
			// console.log(computeStyle.getPropertyValue('background-image'))
			let butnEl: HTMLButtonElement;
			for (let i = 0; i < colorsWrapper.children.length; i++) {
				butnEl = colorsWrapper.children[i].children[0] as HTMLButtonElement;
				if (el === butnEl) {
					butnEl.dataset.check = 'on';
				} else {
					butnEl.dataset.check = 'off';
				}
			}
			for (let i = 0; i < wallpapersWrapper.children.length; i++) {
				butnEl = wallpapersWrapper.children[i].children[0] as HTMLButtonElement;
				if (el === butnEl) {
					butnEl.dataset.check = 'on';
				} else {
					butnEl.dataset.check = 'off';
				}
			}
		}
	}

	function getBoardNameWidh() {
		boardNameWidth = boardNameEl.getBoundingClientRect().width;
		console.log(boardNameWidth);
	}

	function SetchangeBoardName() {
		$changeBoardName = true;
		boardNameInput.focus();
		boardNameInput.select();
	}

	onMount(() => {
		boardNameWidth = boardNameEl.getBoundingClientRect().width;
		boardNameInput.focus();
		boardNameInput.select();
	});
</script>

<main class="h-[100dvh] w-[100vw] flex bg-[darkorange]">
	{#if $sidebar}
		<aside
			class="w-[248px] h-full text-primary-foreground relative bg-[#0000003d] border-r border-muted-foreground flex-shrink-0"
		>
			<div class="w-full h-full absolute left-0">
				<div
					class="h-[70px] w-full border-y border-muted-foreground flex items-center px-2 justify-between"
				>
					<div class="flex gap-1">
						<Button class="font-extrabold bg-pink-800">T</Button>
						<span class="text-muted self-end"> Text </span>
					</div>
					<Button
						on:click={() => sidebar.set(false)}
						variant="ghost"
						size="icon"
						class="hover:bg-icon hover:text-primary-foreground backdrop-blur-sm"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
				</div>
				<nav class="h-[calc(100%-70px)] w-full relative">
					<div class="w-full px-2 py-1 flex justify-between items-center">
						<h2 class="font-bold">Your boards</h2>
						<div class="flex items-center gap-2">
							<Popover.Root closeOnOutsideClick={false}>
								<Popover.Trigger class="text-primary-foreground hover:bg-icon px-2 py-1">
									<MoreHorizontal class="icon" />
								</Popover.Trigger>
								<Popover.Content class="h-[10rem]">
									<h2 class="text-center">your board</h2>
									<div class="mt-1.5 grid gap-1">
										<label for="sort">sort</label>
										<Select.Root bind:value={sortBoard}>
											<Select.Trigger class="w-full">
												<Select.Value placeholder={sortBoard} />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="alphabetically">Sort alphabetically</Select.Item>
												<Select.Item value="recent">Sort by most recent</Select.Item>
											</Select.Content>
										</Select.Root>
									</div>
								</Popover.Content>
							</Popover.Root>
							<Popover.Root>
								<Popover.Trigger class="text-primary-foreground hover:bg-icon px-2 py-1">
									<Plus class="icon" />
								</Popover.Trigger>
								<Popover.Content class="w-300px">
									<div class="w-full flex flex-col gap-2">
										<div class=" w-full flex flex-col items-center">
											<h2>Create your table</h2>
											<div
												style="--preview: {wallpaper}"
												class=" pre-wallpeper w-[200px] mt-2 p-2 pophover-board-img"
											>
												<img src="/board.svg" alt="*" />
											</div>
										</div>
										<div class="mt-4 flex flex-col gap-1.5">
											<h3 class="text-sm">wallpaper</h3>
											<div class="w-full flex flex-col gap-1">
												<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<ul
													bind:this={wallpapersWrapper}
													on:click={getWallpaper}
													class="flex items-center gap-1"
												>
													{#each wallpapers as img}
														<li class="flex-grow flex-shrink">
															<button
																data-check="off"
																style=" --img: url({img})"
																class="wallBtn outline-none border-none flex items-center justify-center w-full h-[40px]"
															>
																<span class="text-primary">
																	<Check color="#ffffff" class="icon" />
																</span>
															</button>
														</li>
													{/each}
												</ul>
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
												<ul
													bind:this={colorsWrapper}
													on:click={getWallpaper}
													class="flex w-full gap-1"
												>
													{#each colors as color}
														<li class="flex-grow flex-shrink">
															<button
																data-check="off"
																style=" background-image: {color}"
																class="colorBtn outline-none border-none w-full h-[40px] flex items-center justify-center"
															>
																<span class="text-primary">
																	<Check color="#ffffff" class="icon" />
																</span>
															</button>
														</li>
													{/each}
												</ul>
											</div>
										</div>
										<div class="grid w-full max-w-sm items-center gap-1.5 mt-2">
											<label for="table"><span class="text-sm">title of table</span></label>
											<Input type="text" id="table" name="titleTable" />
											<Input type="hidden" name="wallpaper" value={wallpaper} />
											<!-- <p class="text-sm text-muted-foreground">Enter your email address.</p> -->
										</div>
										<div class="w-full">
											<Button class="w-full">Create</Button>
										</div>
									</div>
								</Popover.Content>
							</Popover.Root>
						</div>
					</div>
				</nav>
			</div>
		</aside>
	{/if}

	<!--  -->
	<!-- END ASIDE -->
	<!--  -->

	<section class="flex-grow flex flex-col h-full overflow-hidden relative">
		<header class="w-full h-[76px] bg-[#0000003d] relative overflow-hidden">
			{#if !$sidebar}
				<Button
					on:click={() => sidebar.set(true)}
					variant="ghost"
					size="icon"
					class="absolute rounded-full bg-[#0000003d] text-primary-foreground top-[20%] left-[-10px]  hover:bg-[#00000056] hover:text-primary-foreground"
				>
					<ChevronRight class="h-4 w-4" />
				</Button>
			{/if}

			<div class="boardname w-full h-full pl-14 pr-2 flex items-center justify-between">
				<div
					class=" h-full flex flex-col items-center justify-center relative"
					style="flex-basis: {boardNameWidth + 20}px;"
				>
					<label for="boardName" class="" class:hidden-input={!$changeBoardName}>
						<input
							bind:this={boardNameInput}
							on:change={() => {
								$changeBoardName = false;
							}}
							on:keyup={getBoardNameWidh}
							id="boardName"
							type="text"
							bind:value={boardName}
							style="width: {boardNameWidth + 10}px;"
							class="  px-1 py-1 font-semibold box-content text-left"
						/>
					</label>

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<h1
						bind:this={boardNameEl}
						on:click={SetchangeBoardName}
						class="text-primary-foreground text-lg font-semibold cursor-pointer absolute -z-10"
						class:hidden-board-name={!$changeBoardName}
					>
						{boardName}
					</h1>
				</div>

				<div class="h-full flex gap-2">
					<div class="h-full flex items-center">
						<Popover.Root>
							<Popover.Trigger>
								<Button
									variant="ghost"
									class="hover:bg-icon mr-4 text-primary-foreground hover:text-primary-foreground"
								>
									<ListFilter class="icon mr-2" />
									Filter
								</Button>
							</Popover.Trigger>
							<Popover.Content class="text-secondary-foreground w-[24rem]">
								<h2 class="text-center font-semibold text-secondary-foreground">Filter</h2>
								<div class="w-full flex flex-col gap-3 mt-4">
									<div class="grid w-full max-w-sm items-center gap-1.5">
										<Label for="email">Keyword</Label>
										<Input type="email" id="email" placeholder="Enter a keyword" class="w-full" />
										<p class=" text-xs text-muted-foreground mt-1">
											Search cards, members, labels, and more.
										</p>
									</div>
								</div>
							</Popover.Content>
						</Popover.Root>
						<Separator orientation="vertical" class="h-[60%] bg-[hsla(0,0%,100%,0.16)] w-[2px]" />
					</div>
					<div class="h-full flex items-center gap-2">
						<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->

						<Popover.Root>
							<Popover.Trigger>
								<Avatar.Root>
									<Avatar.Fallback class=" bg-transparent hover:bg-icon text-primary-foreground">
										<svg
											width="24"
											height="24"
											role="presentation"
											focusable="false"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M12 20V4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
												fill="currentColor"
											/></svg
										>
									</Avatar.Fallback>
								</Avatar.Root>
							</Popover.Trigger>
							<Popover.Content class=" w-[23rem] px-0">
								<h2 class="text-center font-semibold text-secondary-foreground mb-4">Theme</h2>
								<div class="theme w-full">
									<RadioGroup.Root value="option-one">
										<div class="flex items-center gap-3 hover:bg-blue-100 py-2 px-4">
                      <RadioGroup.Item value="option-one" id="option-one" />
                      <Label for="option-one" class="flex flex-grow items-center gap-3">
                        <svg class="rvDccMV6THGTZI"><image href="/light-theme.svg"></image></svg>
                        <div>
                          light
                        </div>
                      </Label>
										</div>
										<div class="flex items-center gap-3 hover:bg-blue-100 py-2 px-4">
											<RadioGroup.Item value="option-two" id="option-two" />
											<Label for="option-two" class="flex flex-grow items-center gap-3">
                        <svg ><image href="/dark-theme.svg"></image></svg>
                        <div>
                          dark
                        </div>
                      </Label>
										</div>
										<div class="flex items-center gap-3 hover:bg-blue-100 py-2 px-4">
											<RadioGroup.Item value="option-three" id="option-three" />
											<Label for="option-three"  class="flex flex-grow items-center gap-3">
                        <svg ><image href="/system-theme.svg"></image></svg>
                        <div>
                          automatic
                        </div>
                      </Label>
										</div>
									</RadioGroup.Root>
								</div>
							</Popover.Content>
						</Popover.Root>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Avatar.Root>
									<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
									<Avatar.Fallback class="bg-blue-600 text-primary-foreground">CN</Avatar.Fallback>
								</Avatar.Root>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>My Account</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>Profile</DropdownMenu.Item>
									<DropdownMenu.Item>Billing</DropdownMenu.Item>
									<DropdownMenu.Item>Team</DropdownMenu.Item>
									<DropdownMenu.Item>Subscription</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</div>
			</div>
		</header>

		<div class="w-full h-full flex gap-4 overflow-x-auto p-4">
			<slot><!-- optional fallback --></slot>
			<!-- {#each Array(8) as _}
        <div class="h-[200px] w-[300px] bg-muted   flex-shrink-0">

        </div>
      {/each} -->
		</div>
	</section>
</main>

<style>
	.pophover-board-img {
		background-image: url('https://images.unsplash.com/photo-1692356573087-00b545ac4694?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80');
		background-position: center;
		background-size: cover;
	}

	.wallBtn {
		background-image: var(--img);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.colorBtn {
		/* background-image:   var(--colors); */
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		/* background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90% ); */
	}

	.pre-wallpeper {
		background-image: var(--preview);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	button[data-check='off'] span {
		visibility: hidden;
	}
	button[data-check='on'] span {
		visibility: visible;
	}

	.hidden-input {
		opacity: 0;
		position: absolute;
		z-index: -10;
	}

	.hidden-board-name {
		z-index: 10;
		background-color: inherit;
		padding: 20px;
	}

  .theme svg {
   width: 64px;
   height: 48px;
   border-radius: 8px;
  }
</style>
