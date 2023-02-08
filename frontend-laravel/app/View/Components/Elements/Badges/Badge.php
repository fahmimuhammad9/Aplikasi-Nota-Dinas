<?php

namespace App\View\Components\Elements\Badges;

use Illuminate\View\Component;

class Badge extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(public string $type = 'primary',public $content){}

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.elements.badges.badge');
    }
}
