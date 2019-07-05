# Add new equipment

## Scenario 2: Verify Global Admin can access to create equipment page
* User logged as "Global Admin"
* User open New Device page
* User can access New Device page

## Scenario 4: Verify Validations are appeared incase user hasn’t finished with the form information
* User logged as "Global Admin"
* User open New Device page
* User leaves required fields blank at New Device page
* User clicks Save button at New Device page
* Verify validations appeared on required fields at New Device page
Validation are not displaying for all required field => So it is failing at the moment

## Scenario 6: Verify User can create a device successfully
* User logged as "Global Admin"
* User open New Device page
* User inputs Device Name: "test device"
* User inputs all information for Device Overview
|Default Price|Device Type|Manufacturer|Model|Technical|
|-------------|-----------|------------|-----|---------|
|    12       |Tablet     |Manufacturer|Model|Technical|

* User selects provided information for Attributes with Capacity: "10Gb", Color: "Black"

* User inputs all information for Vendor with Vendor: "ATT"

* User selects provided company from the list of checkbox: "Oyster Labs"

* User inputs all information for Prices
|Retail Price|Price One|Price Two|Price Own|Capacity    |Color  |Vendor     |Company       |
|------------|---------|---------|---------|------------|-------|-----------|--------------|
|    12      |13       |15       |18       |10Gb        |Black  |ATT        |Oyster Labs   |

* User clicks Save button at New Device page
* Verify new device "test device" is submitted to the database with correct information
Currently, on localhost does not display device list to verify this step => So it is failing at the moment



----- Blocked Scenarios -----

-- Scenario 1: Verify Admin users at a company can access to create equipment page
Status: Block. There is no admin account to test

-- Scenario 3: Verify other user (not Admin user) can NOT access to create equipment page
Status: Block. There is no non-admin account to test

-- Scenario 5: Verify data binding are correct for each fields type
Status: Block. Currently, website does not support data binding

-- Scenario 7: Verify the device submitted by Admin users at a company is moved to that company’s inventory
Status: Block. There is no admin account to test

-- Scenario 8: Verify the device submitted by Global Admin users at a company is moved to the company’s inventory that he entered at Company section
Status: Block. Currently, user cannot switch to Other company's inventory