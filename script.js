document.addEventListener('DOMContentLoaded', function () {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');
    const redInput = document.getElementById('red-input');
    const greenInput = document.getElementById('green-input');
    const blueInput = document.getElementById('blue-input');
    const colorBox = document.getElementById('color-box');
    const hexCodeInput = document.getElementById('hex-code');
    const colorPicker = document.getElementById('color-picker');

    // Función para actualizar el color
    function updateColor() {
        const red = parseInt(redSlider.value);
        const green = parseInt(greenSlider.value);
        const blue = parseInt(blueSlider.value);

        // Actualizar el color de fondo del recuadro
        const color = `rgb(${red}, ${green}, ${blue})`;
        colorBox.style.backgroundColor = color;

        // Convertir RGB a Hexadecimal
        const hex = rgbToHex(red, green, blue);
        hexCodeInput.value = hex;

        // Sincronizar los campos de texto con los controles deslizantes
        redInput.value = red;
        greenInput.value = green;
        blueInput.value = blue;

        // Sincronizar el color picker
        colorPicker.value = hex;
    }

    // Función para convertir RGB a hexadecimal
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // Función para convertir hexadecimal a RGB
    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    // Función para validar y actualizar los valores desde los campos de texto
    function updateFromInput() {
        let red = parseInt(redInput.value);
        let green = parseInt(greenInput.value);
        let blue = parseInt(blueInput.value);

        // Validar que los valores estén dentro del rango (0-255)
        red = isNaN(red) ? 0 : Math.min(255, Math.max(0, red));
        green = isNaN(green) ? 0 : Math.min(255, Math.max(0, green));
        blue = isNaN(blue) ? 0 : Math.min(255, Math.max(0, blue));

        // Actualizar los controles deslizantes
        redSlider.value = red;
        greenSlider.value = green;
        blueSlider.value = blue;

        // Actualizar el color
        updateColor();
    }

    // Función para actualizar desde el color picker
    function updateFromColorPicker() {
        const hex = colorPicker.value;
        const { r, g, b } = hexToRgb(hex);

        // Actualizar los controles deslizantes y campos de texto
        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;
        redInput.value = r;
        greenInput.value = g;
        blueInput.value = b;

        // Actualizar el color
        updateColor();
    }

    // Escuchar cambios en los controles deslizantes
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Escuchar cambios en los campos de texto
    redInput.addEventListener('input', updateFromInput);
    greenInput.addEventListener('input', updateFromInput);
    blueInput.addEventListener('input', updateFromInput);

    // Escuchar cambios en el color picker
    colorPicker.addEventListener('input', updateFromColorPicker);

    // Inicializar el color al cargar la página
    updateColor();
});