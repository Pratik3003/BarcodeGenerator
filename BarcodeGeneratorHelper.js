({
    validateBarcodeInput: function(barcodeValue, selectedFormat) {
        // Check if the barcodeValue is empty
        if (!barcodeValue || barcodeValue.trim() === '') {
            return { success: false, errorMessage: "Barcode value cannot be empty.", checksum: "" };
        }

        // Perform additional validation based on selected format
        switch(selectedFormat) {
            case "CODE128":
                // No additional validation needed for CODE128 format
                break;
            case "CODE39":
                // Validation logic for CODE39 format
                // CODE39 accepts alphanumeric characters and a few special characters
                if (!/^[\dA-Z-. $/+%]*$/.test(barcodeValue)) {
                    return { success: false, errorMessage: "Invalid barcode input for CODE39 format.", checksum: "" };
                }
                break;
            case "EAN5":
                // Validation logic for EAN5 format
                if (barcodeValue.length !== 5 || !/^\d+$/.test(barcodeValue)) {
                    return { success: false, errorMessage: "Invalid barcode input for EAN5 format. Barcode value must be 5 digits.", checksum: "" };
                }
                break;
            case "UPC":
                // Validation logic for UPC format
                if (barcodeValue.length !== 12 || !/^\d+$/.test(barcodeValue)) {
                    return { success: false, errorMessage: "Invalid barcode input for UPC format. Barcode value must be 12 digits.", checksum: "" };
                }

                // Calculate checksum
                var sum = 0;
                for (var i = 0; i < 11; i++) {
                    sum += parseInt(barcodeValue.charAt(i)) * (i % 2 === 0 ? 3 : 1);
                }

                var checksum = (10 - (sum % 10)) % 10;

                if (checksum.toString() !== barcodeValue.charAt(11)) {
                    return { success: false, errorMessage: "Invalid checksum digit (last digit) for UPC barcode. Expected: " + checksum, checksum: "" };
                }
                break;
            default:
                return { success: false, errorMessage: "Unsupported barcode format.", checksum: "" };
        }
        
        // If no specific error is encountered, return an empty string
        return { success: true, errorMessage: "", checksum: "", barcode: barcodeValue };
    },

    generateBarcode: function(component, barcodeValue, selectedFormat) {
        // Validate barcode input
        var validationResult = this.validateBarcodeInput(barcodeValue, selectedFormat);
        if (!validationResult.success) {
            // Return the error message if validation fails
            return validationResult;
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
            background: "transparent" // Set the background color if needed
        });

        // Set the barcodeGenerated attribute to true
        component.set("v.barcodeGenerated", true);

        return validationResult; // Barcode generated successfully
    }
})
