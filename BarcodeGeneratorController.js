({
    generateBarcode : function(component, event, helper) {
        // Get the barcode value and selected format
        var barcodeValue = component.get("v.barcodeValue");
        var selectedFormat = component.get("v.selectedFormat");

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
            background: "transparent", 
        });

        // Set the barcodeGenerated attribute to true
        component.set("v.barcodeGenerated", true);
    }
})