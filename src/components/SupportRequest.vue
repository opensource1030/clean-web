<template>
    <div class="support-form-holder">
        <b-card>
            <div class="form-header">
                <a class="btn-close" href="javascript:;" title="close"><i class="fa fa-times-circle"> </i> </a>
            </div>
            <b-form id="support-form">
            <b-form-group class="support-form-container">
                <div>
                    <label>
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
                    </label>
                </div>
                    <div id="Container" class="mt-1">
                        <div class="mix amd">
                            <label>
                                <label>IMEI/MEID</label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <input class="form-control"  type="text" id="imei_meid" placeholder="imei/meid">
                            </label>
                        </div>
                        <div class="mix amd">
                            <label>
                                <label class="mt-1">ICCID</label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <input class="form-control" type="text" id="iccid" placeholder="iccid">
                            </label>
                        </div>
                        <div class="mix amd">
                            <label>
                                <label class="mt-1">Device type, Make/Model </label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <input class="form-control" type="text" id="device_type" placeholder="device type">
                            </label>
                        </div>
                        <div class="mix amd">
                            <label>
                                <label class="mt-1">Phone Origin </label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Where did you get the phone? IE: New Service, Upgrade, Internal">*</span>
                                <input class="form-control" type="text" id="phone_origin" placeholder="phone origin">
                            </label>
                        </div>
                        <div class="mix amd">
                            <label>
                                <label class="mt-1">Mobile # </label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <input class="form-control" type="text" id="int_mobile" placeholder="mobile number">
                            </label>
                        </div>
                        <div class="mix aif">
                            <label>
                                <label class="mt-1">What Country are you travelling to? </label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <select class="form-control select-me" id="country2" style="width: 100%" name="country2" multiple required> </select>
                            </label>
                        </div>
                        <div class="mix aif">
                            <label>   
                                <label class="mt-1">Dates of travel</label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required " data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <input class="flatpickr form-control" id="flatpickr"  type="text" placeholder="Select Date..">
                            </label>
                        </div>
                        <div class="mix aif">
                            <label>    
                                <label class="mt-1">Device Type (Phone/Tablet/MiFi)</label>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <input class="form-control" type="text" id="int-device_type" placeholder="">
                            </label>
                        </div>
                        <div class="mix ec">
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
                        <div>
                           <label>
                                <span class="form-title">Requestor Email (whomever is filling out this form)</span>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Whomever is filling out this form.">
                                    <i class="fa fa-question-circle"></i>
                                </span>
                            </label>
                            <input id="requestor_email" type="text"> 
                        </div>
                        <div class="medium-12 columns">
                            <label>
                            <span class="form-title">Recipient Email (the affected user)</span>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="The affected user.">
                                <i class="fa fa-question-circle"></i>
                            </span>
                            <input type="text" id="recipient_email" placeholder="your email">
                            </label>
                        </div>
                        <div>
                            <label>
                            <span class="form-title">Recipient Mobile Number (if number is unavailable, please add N/A)</span>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="if number is unavailable, please add N/A.">
                                <i class="fa fa-question-circle"></i>
                            </span>
                            <input id="recipient_mobile" type="text" placeholder="recipient mobile #">
                            </label>
                        </div>
                        <div>
                            <fieldset class="fieldset">
                                <legend>
                                    <span class="form-title">Priority </span>
                                    <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                                </legend>
                                <div class="row">
                                    <div class="column large-6 mr-4">
                                    <input type="radio" name="priority" value="Low" id="low" required><label class="ml-2" for="low">Low</label>
                                    </div>
                                    <div class="column large-6 mr-4">
                                    <input type="radio" name="priority" value="Medium" id="medium"><label class="ml-2" for="medium">Medium</label>
                                    </div>
                                    <div class="column large-6 mr-4">
                                    <input type="radio" name="priority" value="High" id="high"><label class="ml-2" for="high">High</label>
                                    </div>
                                    <div class="column large-6 mr-4">
                                    <input type="radio" name="priority" value="Asap" id="asap"><label class="ml-2" for="asap">Asap</label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <fieldset class="fieldset">
                            <legend>
                                <span class="form-title">Who should we contact? </span>
                                <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            </legend>
                            <div class="row">
                                <div class="column large-6 mr-4">
                                    <input type="radio" name="contact-person" value="Recipent" id="recipent" required>
                                    <label class="ml-2" for="recipent">Recipent</label>
                                </div>
                                <div class="column large-6 mr-4">
                                    <input type="radio" name="contact-person" value="Requestor" id="requestor">
                                    <label class="ml-2" for="requestor">Requestor</label>
                                </div>
                            </div>
                            </fieldset>
                        </div>
                        <div class="medium-12 columns">
                            <label>
                            <span class="form-title">Description</span>
                            <span data-tooltip aria-haspopup="true" class="has-tip top is-required" data-disable-hover="false" tabindex="1" title="Required Field">*</span>
                            <span data-tooltip aria-haspopup="true" class="has-tip top" data-disable-hover="false" tabindex="1" title="Please explain the question or problem in detail, and let us know how you'd like to be contacted.">
                                <i class="fa fa-question-circle"></i>
                            </span>
                                <textarea rows="3" id="description" name="description" required></textarea>
                            </label>
                        </div>
                        <div class="form-footer">
                            <button type="submit" class="button btn-submit ">Submit Ticket</button>
                        </div>
                        <div class="tiny reveal request-modal" id="modal" data-reveal>
                            <button class="close-button" data-close aria-label="Close Accessible Modal" type="button">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
            </b-form-group>
        </b-form>
        </b-card>
  </div>
</template>