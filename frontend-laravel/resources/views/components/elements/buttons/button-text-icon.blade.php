<a href="{{ $url }}" {{ $attributes->merge(['class' => 'btn btn-icon-text btn-'.$type]) }}>
    @if (!$inverseIcon) <i class="{{ $icon }} btn-icon-prepend"></i> @endif
    {{ $content }}
    @if ($inverseIcon) <i class="{{ $icon }} btn-icon-append"></i> @endif
</a>