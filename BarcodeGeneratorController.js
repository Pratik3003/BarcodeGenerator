({
    generateBarcode : function(component, event, helper) {
        // Get the barcode value and selected format
        var barcodeValue = component.get("v.barcodeValue");
        var selectedFormat = component.get("v.selectedFormat");

        // Validate barcode input
        var isValid = helper.validateBarcodeInput(barcodeValue, selectedFormat);
        if (!isValid) {
            // Set error message if validation fails
            component.set("v.errorMessage", "Invalid barcode input.");
            // Clear the canvas
            var canvas = component.find("barcodeCanvas").getElement();
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Set barcodeGenerated attribute to false
            component.set("v.barcodeGenerated", false);
            return;
        }

        // Get the canvas element
        var canvas = component.find("barcodeCanvas").getElement();

        // Clear the previous barcode
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Generate the barcode with the selected format
        JsBarcode(canvas, barcodeValue, {
            format: selectedFormat,
            displayValue: true,
            fontSize: 18,
            background: "transparent", // Set the background color if needed
        });

        // Set the barcodeGenerated attribute to true
        component.set("v.barcodeGenerated", true);
        // Clear error message if barcode generation is successful
        component.set("v.errorMessage", "");
    }
})
