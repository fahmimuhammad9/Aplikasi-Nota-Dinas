<?php

namespace App\View\Components\Elements\Buttons;

use Illuminate\View\Component;

class ButtonTextIcon extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(public string $type = 'primary',public $content = '',public $icon, public $url = '#', public $inverseIcon = false){}

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.elements.buttons.button-text-icon');
    }
}
