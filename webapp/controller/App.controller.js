sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",

    "sap/ui/model/type/Currency"
], function (Controller, mobileLibrary, Currency) {
    "use strict"

    return Controller.extend("sap.ui.demo.db.controller.App", {
        formatMail: function(sFirstName, sLastName) {
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            return mobileLibrary.URLHelper.normalizeEmail(
                sFirstName + "." + sLastName + "@example.com",
                oBundle.getText("mailSubject", [sFirstName]),
                oBundle.getText("mailBody")
            );
        },
        formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
            var oCurrency = new Currency();
            return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
        },
        onItemSelected: function(oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("products");
            var sPath = oContext.getPath();

            var oVie = this.getView();
			var oDialog = oVie.byId("helloDialog");

			if (!oDialog) {

		oDialog = sap.ui.xmlfragment(oVie.getId(), "sap.ui.demo.db.fragment.App", this);
				oVie.addDependent(oDialog);
			}
           // var oProductDetailPanel = this.byId("productDetailsPanel");
            oDialog.bindElement({ path: sPath, model: "products"});
            oDialog.open();
        },
        onCloseDialog: function() {
			this.getView().byId("helloDialog").close();
        }
    })
})
