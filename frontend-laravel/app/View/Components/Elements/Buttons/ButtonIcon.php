<?php

namespace App\View\Components\Elements\Buttons;

use Illuminate\View\Component;

class ButtonIcon extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(public string $type = 'primary',public $icon, public $url = '#'){}

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.elements.buttons.button-icon');
    }
}
