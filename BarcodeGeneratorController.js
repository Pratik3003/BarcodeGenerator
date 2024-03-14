({
    generateBarcode : function(component, event, helper) {
        // Reset previous barcode output
        component.set("v.barcodeGenerated", false);

        // Get the barcode value and selected format
        var barcodeValue = component.get("v.barcodeValue");
        var selectedFormat = component.get("v.selectedFormat");

        // Call helper method to generate the barcode
        var result = helper.generateBarcode(component, barcodeValue, selectedFormat);

        // Check if barcode generation was successful
        if (!result.success) {
            // Set error message if barcode generation failed
            component.set("v.errorMessage", result.errorMessage);
        } else {
            // Clear any previous error messages
            component.set("v.errorMessage", "");
        }
    }
})
