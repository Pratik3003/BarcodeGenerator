({
    validateBarcodeInput : function(barcodeValue, selectedFormat) {
        // Add your validation logic here
        // For example, check if the barcodeValue is not empty
        // and matches the required format for the selectedFormat
        
        // Example:
        if (!barcodeValue || barcodeValue.trim() === '') {
            return false;
        }
        
        // Additional validation logic as per barcode standards
        switch(selectedFormat) {
            case "CODE128":
                // Validation logic for CODE128 format
                // No specific validation needed, as CODE128 accepts alphanumeric characters
                break;
            case "CODE39":
                // Validation logic for CODE39 format
                // No specific validation needed, as CODE39 accepts alphanumeric characters
                break;
            case "EAN5":
                // Validation logic for EAN5 format
                if (barcodeValue.length !== 5 || !/^\d+$/.test(barcodeValue)) {
                    return false;
                }
                break;
            case "ITF14":
                // Validation logic for ITF14 format
                // No specific validation needed, as ITF14 accepts numeric characters
                if (barcodeValue.length !== 14 || !/^\d+$/.test(barcodeValue)) {
                    return false;
                }
                break;
            // Add more cases as needed for other formats
            default:
                return false;
        }
        
        return true;
    },

    generateBarcode : function(component, barcodeValue, selectedFormat) {
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
    }
})
