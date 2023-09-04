<script>
    export let showModal; // boolean
    export let isActiveCloseButtonStore

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
    let isActiveCloseButton;

	const unsubscribe = isActiveCloseButtonStore.subscribe((value) => {
		isActiveCloseButton = value;
	});
    let closeImageBtnSrc =  'images/Regular_01.png'
    console.log('closeImageBtnSrc',closeImageBtnSrc)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class='btn-wrapper'>
            <button autofocus on:click={() => {

                isActiveCloseButtonStore.set(true)
                console.log(isActiveCloseButton,closeImageBtnSrc)
                dialog.close()
            }}
            on:mousedown={() => {
    
                isActiveCloseButtonStore.set(true)
                closeImageBtnSrc = 'images/Pressed_01.png'
            }}
             on:mouseup={() => {
    
                isActiveCloseButtonStore.set(true)
                closeImageBtnSrc =  'images/Regular_01.png'
            }}
            >
        </button>
        </div>
		<slot name="header" />
		<hr />
		<slot />
		<hr />
	</div>
</dialog>

<style>
	dialog {
		border-radius: 0.2em;
		border: none;
		background: center / cover no-repeat url(images/free-png.ru-709.png);
    	width: 1023px;
    	height: 723px;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
        display: flex;
        flex-direction: column;
		margin: 30px;
        height: 100%;
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
    .btn-wrapper {
        display: flex;
        justify-content: end;
    }
	button {
		height: 34px;
		width: 34px;
        border: none;
        overflow: visible;
        background: transparent;
		display: block;
        justify-content: end;
        display: flex;
        background: 50% 20% / auto no-repeat url('images/Regular_01.png');
	}
    button:hover {
	}
    button:active {
        background: 50% 30% / auto no-repeat url('images/Pressed_01.png');
	}
</style>
