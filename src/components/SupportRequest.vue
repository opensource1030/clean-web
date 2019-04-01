<template>
    <div class="support-form-holder form-leteral">
        <b-card>
            <div class="form-header">
            <a class="btn-close" href="javascript:;" title="close"><i class="fa fa-times-circle"> </i> </a>
            </div>
            <b-form id="support-form">
            <b-form-group>
                    <label>How Can We Help?</label>
                    <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                    <select id="support-issues" class="user-actions form-control" required>
                        <option selected disabled value=" ">-- Choose an issue ---</option>
                        <optgroup label="Billing">
                            <option data-id="issue-4" data-support-tag="BIL1" data-value="Questions About My Monthly Statement" value="qamms">
                            Questions About My Monthly Statement
                            </option>
                            <option data-id="issue-15" data-support-tag="BIL1" data-value="Other Billing Issues" value="obi">
                            Other Billing Issues
                            </option>
                        </optgroup>
                        <optgroup label="Device Support">
                            <option data-id="issue-5" data-value="Activate My Device" data-support-tag="IRE0" value="amd">
                            Activate My Device
                            </option>
                            <option data-id="issue-3" data-value="Email Connectivity" data-support-tag="IRE0" value="ec">
                            Email Connectivity
                            </option>
                            <option data-id="issue-8" data-support-tag="IRE0" data-value="Issues While Traveling Abroad" value="iwta">
                            Issues While Traveling Abroad
                            </option>
                            <option data-id="issue-9" data-support-tag="IRE0" data-value="Other Device Support Issues" value="odsi">
                            Other Device Support Issues
                            </option>
                        </optgroup>
                        <optgroup label="Service Plan / Feature">
                            <option data-id="issue-6" data-support-tag="IRE1" data-value="Add/Remove International Features" value="aif">
                            Add International Features
                            </option>
                            <option data-id="issue-10" data-support-tag="IRE1" data-value="Cancel Service" value="cs">
                            Cancel Service
                            </option>
                            <option data-id="issue-2" data-support-tag="IRE1" data-value="Change Existing Features" value="cef">
                            Change Existing Features
                            </option>
                            <option data-id="issue-12" data-support-tag="IRE1" data-value="Suspend/Unsuspend Wireless Service" value="sws">
                            Suspend/Unsuspend Wireless Service
                            </option>
                            <option data-id="issue-13" data-support-tag="IRE1" data-value="Transfer Service to a Personal Account" value="tstpa">Transfer Service to a
                            Personal Account
                            </option>
                            <option data-id="issue-14" data-support-tag="IRE1" data-value="Other Service and Plan Issues" value="osapi">
                            Other Service and Plan Issues
                            </option>
                        </optgroup>
                    </select>
                    <div id="Container" class="mt-3">
                            <label>IMEI/MEID</label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <input class="form-control"  type="text" id="imei_meid" placeholder="imei/meid">

                            <label class="mt-3">ICCID</label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <input class="form-control" type="text" id="iccid" placeholder="iccid">

                            <label class="mt-3">Device type, Make/Model </label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <input class="form-control" type="text" id="device_type" placeholder="device type">
    
                            <label class="mt-3">Phone Origin </label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Where did you get the phone? IE: New Service, Upgrade, Internal">*</span>
                            <input class="form-control" type="text" id="phone_origin" placeholder="phone origin">
                            
                            <label class="mt-3">Mobile # </label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <input class="form-control" type="text" id="int_mobile" placeholder="mobile number">
                           
                            <label class="mt-3">What Country are you travelling to? </label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <select class="form-control select-me" id="country2" style="width: 100%" name="country2" multiple required> </select>
                           
                            <label class="mt-3">Dates of travel</label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <input class="flatpickr form-control" id="flatpickr"  type="text" placeholder="Select Date..">
                            
                            <label class="mt-3">Device Type (Phone/Tablet/MiFi)</label>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <input class="form-control" type="text" id="int-device_type" placeholder="">

                            <fieldset class="fieldset mt-3">
                                <legend>
                                <label>Email Services </label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span></legend>
                                <input type="radio" class="form-check-input" name="email_services" value="Email Setup" id="email_setup" required>
                                <label for="email_setup">Email Setup</label>
                                
                                
                                
                                <input type="radio" class="form-check-input" name="email_services" value="Email Troubleshooting" id="email_troubleshooting">
                                <label for="email_troubleshooting">Email Troubleshooting</label>
                            </fieldset>
                    </div>
            </b-form-group>
            </b-form>
        </b-card>
  </div>
</template>