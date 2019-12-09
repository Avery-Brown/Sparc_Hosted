<!--This code was developed in part by Lizzet Clifton, Eric Lin, Jordan Shapiro, and Katelyn Chang for Duke CS408-->
<template>
        <div class="main" style="background: #f2f2f2;">
            <div class = "container">
                <div class = "row" style="margin-bottom: 20px;">
                    <div class = "col-md-3" style="margin-top: 2rem">
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===0 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===0 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i :class="['fa fa-pencil fa-md', stage===0 ? 'active-icon' : 'completed-icon']" />
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p :class="[stage === 0 ? 'active-step-text' : 'completed-step-text']">Title</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i class="fa fa-check-circle fa-md active-icon" />
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===1 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===1 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===1" class="fa fa-edit fa-md active-icon" />
                                                <i v-else :class="['fa fa-edit fa-md', stage < 1 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===1" class="active-step-text">Description</p>
                                                <p v-else :class="[stage < 1 ? 'inactive-step-text' : 'completed-step-text']">Description</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===1" class="fa fa-check-circle fa-md active-icon" />
                                                <i v-else :class="['fa fa-check-circle fa-md', stage < 1 ? 'inactive-icon-check' : 'active-icon']"/>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===2 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===2 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===2" class="fa fa-calendar fa-md active-icon" />
                                                <i v-else :class="['fa fa-calendar fa-md', stage < 2 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===2" class="active-step-text">Time</p>
                                                <p v-else :class="[stage < 2 ? 'inactive-step-text' : 'completed-step-text']">Time</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===2" class="fa fa-check-circle fa-md active-icon" />
                                                <i v-else :class="['fa fa-check-circle fa-md', stage < 2 ? 'inactive-icon-check' : 'active-icon']"/>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===3 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===3 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===3" class="fa fa-list fa-md active-icon" />
                                                <i v-else :class="['fa fa-list fa-md', stage < 3 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===3" class="active-step-text">Details</p>
                                                <p v-else :class="[stage < 3 ? 'inactive-step-text' : 'completed-step-text']">Details</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===3" class="fa fa-check-circle fa-md active-icon" />
                                                <i v-else :class="['fa fa-check-circle fa-md', stage < 3 ? 'inactive-icon-check' : 'active-icon']"/>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===4 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===4 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===4" class="fa fa-map-signs fa-md active-icon" />
                                                <i v-else :class="['fa fa-map-signs fa-md', stage < 4 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===4" class="active-step-text">Location</p>
                                                <p v-else :class="[stage < 4 ? 'inactive-step-text' : 'completed-step-text']">Location</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===4" class="fa fa-check-circle fa-md active-icon" />
                                                <i v-else :class="['fa fa-check-circle fa-md', stage < 4 ? 'inactive-icon-check' : 'active-icon']"/>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===5 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===5 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===5" class="fa fa-comment-dollar fa-md active-icon" />
                                                <i v-else :class="['fa fa-comment-dollar fa-md', stage < 5 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===5" class="active-step-text">Price</p>
                                                <p v-else :class="[stage < 5 ? 'inactive-step-text' : 'completed-step-text']">Price</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===5" class="fa fa-check-circle fa-md active-icon" />
                                                <i v-else :class="['fa fa-check-circle fa-md', stage < 5 ? 'inactive-icon-check' : 'active-icon']"/>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===6 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===6 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===6" class="fa fa-photo-video fa-md active-icon" />
                                                <i v-else :class="['fa fa-photo-video fa-md', stage < 6 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===6" class="active-step-text">Media</p>
                                                <p v-else :class="[stage < 6 ? 'inactive-step-text' : 'completed-step-text']">Media</p>
                                            </div>
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===6" class="fa fa-check-circle fa-md active-icon" />
                                                <i v-else :class="['fa fa-check-circle fa-md', stage < 6 ? 'inactive-icon-check' : 'active-icon']"/>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        <div class = "row">
                            <div class = "col">
                                <div :class="['card step-card', stage===7 ? 'shadow-md' : 'shadow-none step-card-inactive']" style="border-radius: 5px;">
                                    <div :class="['card-body', stage===7 ? 'active-card-body' : 'completed-inactive-card-body']">
                                        <div class = "row" style="margin-top: -10.5px; margin-bottom: -15px;">
                                            <div class = "col-2 mt-auto mb-auto">
                                                <i v-if="stage===7" class="fa fa-check fa-md active-icon" />
                                                <i v-else :class="['fa fa-check fa-md', stage < 7 ? 'inactive-icon' : 'completed-icon']"/>
                                            </div>
                                            <div class = "col-8 mt-auto mb-auto">
                                                <p v-if="stage===7" class="active-step-text">Review</p>
                                                <p v-else :class="[stage < 7 ? 'inactive-step-text' : 'completed-step-text']">Review</p>
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                    
                    </div>
                    <div class = "col-md-9" style="margin-top: 2rem; margin-left: -2.5rem;">
                        <div v-if="stage===0">
                            <div class="row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">Get Started</p>
                                                    <p class="step-progress-text">Step 1 of 8</p>
                                                </diV>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Give your engagement a title</p>
                                                    <b-form-group>
                                                        <b-form-input
                                                            placeholder = "Engagement Title"
                                                            v-model="eventPayload.event_name"
                                                        />
                                                    </b-form-group>
                                                    <p class="bold-text">Here are some good examples: </p>
                                                    <div class = "items-list">
                                                        <li>Consulting Case Prep Walkthrough | McKinsey | Bain | BCG </li>
                                                        <li>Learn How to Ace the Investment Banking Interview</li>
                                                        <li>Interested in Healthy Living? Top Nutrition Tips</li>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow gray-section">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Tags and Keywords</p>
                                                    <multiselect v-model="eventPayload.tags"
                                                        :options="allTags"
                                                        :multiple="true"
                                                        :close-on-select="true"
                                                        :clear-on-select="true"
                                                        :preserve-search="false"
                                                        :selectLabel="null"
                                                        :deselectLabel="null"
                                                        placeholder="Tags"
                                                        label="value"
                                                        track-by="value"
                                                        :taggable="false"
                                                        :preselect-first="false"/>
                                                    <br/>
                                                    <p class="info-text">
                                                        Choose relavent tags for your engagement. These tags allow users to get a quick sense of what your engagement will be about, and will allow users to search by these tags.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button 
                                                        :class="[eventPayload.event_name === '' || eventPayload.tags.length < 1 ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="eventPayload.event_name === '' || eventPayload.tags.length < 1 "
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===1">
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">Add a Description</p>
                                                    <p class="step-progress-text">Step 2 of 8</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">What to include in your description:</p>
                                                    <div class = "items-list">
                                                        <li>Give some background information about yourself and your expertise</li>
                                                        <li>Tell the user what they can learn or achieve from this engagement</li>
                                                        <li>Any baseline knowledge they should need before starting this engagement</li>
                                                    </div>
                                                    <b-form-group style="margin-top: 2rem;">
                                                        <b-form-textarea
                                                            style="border: 0.5px solid #e3e3e3; border-radius: 5px; padding-bottom: 100px;"  
                                                            placeholder="Engagement Description"
                                                            v-model="eventPayload.event_description"
                                                        type="text"/>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                        </div>
                                         <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="back-button shadow" @click="decrementStage">
                                                        Back
                                                    </button>
                                                    <button 
                                                        :class="[eventPayload.event_description === '' ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="eventPayload.event_description === ''"
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===2">
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">When is Your Engagement?</p>
                                                    <p class="step-progress-text">Step 3 of 8</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Let your attendees know when your engagements start and end:</p>
                                                    <div class = "items-list">
                                                        <li>Choose a time that you think would be convenient for both you and your attendees</li>
                                                        <li>Functionality for time changes is not available yet</li>
                                                    </div>
                                                    <b-form-group style="margin-top: 1rem;">
                                                        <p class="bold-text">Date</p>
                                                        <el-date-picker
                                                            type="date"
                                                            placeholder="Choose a Date"
                                                            popper-class="date-picker date-picker-success"
                                                            :picker-options="pickerOptions"
                                                            v-model="eventPayload.date"
                                                        >
                                                        </el-date-picker>
                                                    </b-form-group>
                                                    <b-form-group style="margin-top: 1rem;">
                                                        <p class="bold-text">Start and End Time</p>
                                                        <div class = "row">
                                                            <div class = "col-6">
                                                                <el-time-picker
                                                                    type="time"
                                                                    value-format="hh:mm a"
                                                                    placeholder="Choose a Start Time"
                                                                    popper-class="time-picker time-picker-primary"
                                                                    v-model="eventPayload.start_time"
                                                                    :picker-options="{
                                                                        format: 'HH:mm a',

                                                                    }"
                                                                />
                                                            </div>
                                                            <div class = "col-6">
                                                                <el-time-picker
                                                                    type="time"
                                                                    value-format="hh:mm a"
                                                                    placeholder="Choose an End Time"
                                                                    popper-class="time-picker time-picker-primary"
                                                                    v-model="eventPayload.end_time"
                                                                    :picker-options="{
                                                                        format: 'HH:mm a',

                                                                    }"
                                                                />
                                                            </div>
                                                        </div>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                        </div>
                                         <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="back-button shadow" @click="decrementStage">
                                                        Back
                                                    </button>
                                                    <button 
                                                        :class="[eventPayload.date === null || eventPayload.start_time === null || eventPayload.end_time === null ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="eventPayload.date === null || eventPayload.start_time === null || eventPayload.end_time === null"
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===3">
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">Engagement Details</p>
                                                    <p class="step-progress-text">Step 4 of 8</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Choose whether your engagement is In-Person, Virtual, or Both</p>
                                                    <div class = "items-list">
                                                        <li>In-Person Engagements are hosted only in-person</li>
                                                        <li>Virtual engagements don't require in-person meetups. Just share a virtual conference link</li>
                                                        <li>You can also select to do both: have people meet with you in-person, while live-streaming your event</li>
                                                    </div>
                                                    <b-form-group style="margin-top: 1rem;">
                                                        <p class="bold-text">Engagement Types </p>
                                                        <div class = "row">
                                                            <div class = "col">
                                                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.event_type" value="virtual"> &nbsp;&nbsp;Virtual Engagement
                                                            </div>
                                                        </div>
                                                        <div class = "row">
                                                            <div class = "col">
                                                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.event_type" value="in Person"> &nbsp;&nbsp;In-Person Engagement
                                                            </div>
                                                        </div>
                                                        <div class = "row">
                                                            <div class = "col">
                                                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.event_type" value="both"> &nbsp;&nbsp;Both
                                                            </div>
                                                        </div>
                                                        
                                                    </b-form-group>
                                                    <div class="row mt-3" v-if="eventPayload.event_type == 'in Person'">
                                                        <div class = "col">
                                                            <div class = "row">
                                                                <div class = "col-3">
                                                                    <div>
                                                                        <p class="bold-text">Physical Capacity</p>
                                                                        <fg-input placeholder="Count" type="number" min="1" v-model="eventPayload.capacity"></fg-input>
                                                                    </div>
                                                                </div>
                                                                <div class = "col-9">
                                                                </div>
                                                            </div>
                                                            <div class = "row">
                                                                <div class = "col">
                                                                    <p class="error-text" v-if="parseInt(eventPayload.capacity) < 1"> Choose value greater than 0 </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-3" v-if="eventPayload.event_type == 'virtual'">
                                                        <div class = "col">
                                                            <div class = "row">
                                                                <div class = "col-3">
                                                                        <p class="bold-text">Virtual Capacity</p>
                                                                        <fg-input placeholder="Count" type="number" min="1" v-model="eventPayload.virtual_capacity"></fg-input>
                                                                </div>
                                                                <div class = "col-9">
                                                                        <p class="bold-text">Virtual Conference Link</p>
                                                                        <fg-input placeholder="Please enter a Zoom or Google Hangout Link" v-model="eventPayload.zoom_link"></fg-input>
                                                                </div>
                                                            </div>
                                                            <div class = "row">
                                                                <div class = "col">
                                                                    <p class="error-text" v-if="parseInt(eventPayload.virtual_capacity) < 1"> Choose value greater than 0 </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-3" v-if="eventPayload.event_type == 'both'">
                                                        <div class = "col">
                                                            <div class = "row">
                                                                <div class = "col-3">
                                                                    <p class="bold-text">Physical Capacity</p>
                                                                    <fg-input placeholder="Count" type="number" min="1" v-model="eventPayload.capacity"></fg-input>
                                                                </div>
                                                                <div class = "col-3">
                                                                    <p class="bold-text">Virtual Capacity</p>
                                                                    <fg-input placeholder="Count" type="number" min="1" v-model="eventPayload.virtual_capacity"></fg-input>
                                                                </div>
                                                                <div class = "col-6">
                                                                    <p class="bold-text">Virtual Conference Link</p>
                                                                    <fg-input placeholder="Please enter a Zoom or Google Hangout Link" v-model="eventPayload.zoom_link"></fg-input>
                                                                </div>
                                                            </div>
                                                            <div class = "row">
                                                                <div class = "col">
                                                                    <p class="error-text" v-if="parseInt(eventPayload.virtual_capacity) < 1 || parseInt(eventPayload.capacity) < 1">Choose value greater than 0 </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow gray-section">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <b-form-group style="margin-bottom: 1rem;">
                                                        <p class="bold-text">Host Contact Information</p>
                                                        <b-form-input placeholder="Enter Any Contact Info" v-model="eventPayload.host_contact"/>
                                                        
                                                    </b-form-group>
                                                    <p class="info-text">
                                                        Let your attendees know the best method to contact you
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="back-button shadow" @click="decrementStage">
                                                        Back
                                                    </button>
                                                    <button 
                                                        :class="[eventPayload.host_contact === ''
                                                        || (eventPayload.event_type === 'in Person' && eventPayload.capacity < 1)
                                                        || (eventPayload.event_type === 'virtual' && (eventPayload.virtual_capacity < 1 || eventPayload.zoom_link === '')) 
                                                        || (eventPayload.event_type === 'both' && (eventPayload.capacity < 1 || eventPayload.virtual_capacity < 1 || eventPayload.zoom_link ==='')) ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="eventPayload.host_contact === ''
                                                        || eventPayload.host_contact === ''
                                                        || (eventPayload.event_type === 'in Person' && eventPayload.capacity < 1)
                                                        || (eventPayload.event_type === 'virtual' && (eventPayload.virtual_capacity < 1 || eventPayload.zoom_link === '')) 
                                                        || (eventPayload.event_type === 'both' && (eventPayload.capacity < 1 || eventPayload.virtual_capacity < 1 || eventPayload.zoom_link ===''))"
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===4">
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">Where is Your Engagement?</p>
                                                    <p class="step-progress-text">Step 5 of 8</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">For in person engagements or engagements that are both in person and virtual:</p>
                                                    <div class = "items-list">
                                                        <li>Choose a location to host your engagement</li>
                                                        <li>If your engagement will be virtual only, fill fields with "Virtual Engagement" or "N/A"</li>
                                                    </div>
                                                    <b-form-group style="margin-top: 1rem;">
                                                        <p class="bold-text">Location: </p>
                                                        <div class = "items-list">
                                                            <li>Pick a common spot people are familiar with: "Perkins Library", "Fuqua School"</li>
                                                        </div>
                                                        
                                                        <b-form-input style="margin-top: 1rem" placeholder="Enter a Location" v-model="eventPayload.event_location"/>
                                                    </b-form-group>
                                                    <b-form-group style="margin-top: 1rem;">
                                                        <p class="bold-text">Street Address</p>
                                                       
                                                        <b-form-input style="margin-top: 1rem" placeholder="What's the Address?" v-model="eventPayload.event_address"/>
                                                    </b-form-group>
                                                    <b-form-group style="margin-top: 1rem;">
                                                        <p class="bold-text">Access Instructions: </p>
                                                        <div class = "items-list">
                                                            <li>Are there any specific instructions your attendees need to know to find the engagement?</li>
                                                        </div>
                                                        <b-form-input style="margin-top: 1rem" placeholder="Enter Access Instructions" v-model="eventPayload.event_location_access"/>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                        </div>
                                         <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="back-button shadow" @click="decrementStage">
                                                        Back
                                                    </button>
                                                    <button 
                                                        :class="[eventPayload.event_location === '' || eventPayload.event_address === '' || eventPayload.event_location_access === '' ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="eventPayload.event_location === '' || eventPayload.event_address === '' || eventPayload.event_location_access === ''"
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===5">
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">Engagement Price and Donations</p>
                                                    <p class="step-progress-text">Step 6 of 8</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <div class = "row">
                                                        <div class = "col">
                                                            <p class="bold-text">Will this engagement be free?</p>
                                                            <input style="margin-top:3px; margin-left: 15px; margin-right: 5px;" type="radio" v-model="eventPayload.event_free" value="yes"> Yes
                                                            <input style="margin-top:3px; margin-left: 15px; margin-right: 5px;" type="radio" v-model="eventPayload.event_free" value="no"> No
                                                        </div>
                                                    </div>
                                        

                                                    <div class = "row" style="margin-top: 2rem" v-if="eventPayload.event_free == 'no'">
                                                        <div class = "col">
                                                            <b-form-group>
                                                                <p class="bold-text">Price Per Person ($)</p>
                                                                <fg-input style="width: 130px;" placeholder="USD ($)" type="number" min="1" v-model="eventPayload.event_price_per_person"></fg-input>
                                                            </b-form-group>
                                                            <p class="error-text" v-if="parseInt(eventPayload.event_price_per_person) < 1">Enter price greater than $0</p>
                                                        </div>
                                                    </div>

                                                    <div class = "row" v-if="eventPayload.event_free == 'no'">
                                                        <div class = "col">
                                                            <b-form-group>
                                                                <p class="bold-text">Will this engagement go to a cause?</p>
                                                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.cause" value="yes"> Yes
                                                                <input style="margin-left:10px;" type="radio" v-model="eventPayload.cause" value="no"> No
                                                            </b-form-group>
                                                        </div>
                                                    </div>
                                                    <div class = "row" v-if="eventPayload.cause == 'yes' && eventPayload.event_free == 'no'" style="margin-top: 1rem;">
                                                        <div class = "col">
                                                            <p class="bold-text">Select Charity 1 (required)</p>
                                                            <fg-input placeholder="Ex: Red Cross" v-model="eventPayload.charity1"></fg-input>
                                                        </div>
                                                        <div class = "col">
                                                            <p class="bold-text">% to Charity 1 (required)</p>
                                                            <fg-input placeholder="Enter Percentage" type="number" min="1" v-model="eventPayload.event_cause1"></fg-input>
                                                        </div>
                                                    </div>
                                                    <p class="error-text" v-if="parseInt(eventPayload.event_cause1) < 1">Enter percentage greater than 0%</p>
                                                    <p class="error-text" v-if="parseInt(eventPayload.event_cause1) > 100">Cannot donate more than 100% to a charity</p>
                                                    <div class = "row" v-if="eventPayload.cause == 'yes' && eventPayload.event_free == 'no'" style="margin-top: 1rem;">
                                                        <div class = "col">

                                                            <p class="bold-text">Select Charity 2</p>
                                                            <fg-input placeholder="Ex: Autism Speaks" v-model="eventPayload.charity2"></fg-input>
                                                        </div>
                                                        <div class = "col">
                                                            <p class="bold-text">% to Charity 2</p>
                                                            <fg-input :disabled="eventPayload.charity2 === ''" placeholder="Enter Percentage" type="number" min="1" v-model="eventPayload.event_cause2"></fg-input>
                                                        </div>
                                                    </div>
                                                    <p class="error-text" v-if="parseInt(eventPayload.event_cause2) < 1">Enter percentage than 0%</p>
                                                    <p class="error-text" v-if="parseInt(eventPayload.event_cause2) > 100">Cannot donate more than 100% to a charity</p>
                                                    <p class="error-text" v-if="parseInt(eventPayload.event_cause1) + parseInt(eventPayload.event_cause2) > 100">Total percentage cannot exceed 100%</p>
                                                    <p class="bold-text" style="margin-top: 1rem;">For paid engagements:</p>
                                                    <div class = "items-list">
                                                        <li>Paid engagements require you to choose a dollar amount that each participant must pay</li>
                                                        <li>You may choose to donate a percentage of your earnings to up to 2 charities</li>
                                                        <li>Payments will be held in an escrow account until the engagement is complete</li>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                         <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="back-button shadow" @click="decrementStage">
                                                        Back
                                                    </button>
                                                    <button 
                                                        :class="[invalidPriceStage ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="invalidPriceStage"
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===6">
                            <div class="row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text">Add Media</p>
                                                    <p class="step-progress-text">Step 7 of 8</p>
                                                </diV>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Add a photo for your engagement</p>
                                                    <button class="choose-image-button"  @click="onPickImage">Upload Image</button>
                                                    <span v-if="imgFileName != '' ">{{imgFileName}}</span>
                                                    <input type="file" accept="image/*" @change="onFileSelected" style="display:none;" ref="ImageInput"/>
                                                    <section class="ml-auto mr-auto" style="width: 300px; margin-top: 1rem;"  v-if="cropping">
                                                        <p class="bold-text">Please crop your image: </p>
                                                        <vue-cropper
                                                            ref="cropper"
                                                            :src="imgSrc"
                                                            alt="Source Image"
                                                            :aspectRatio="1/1"
                                                            :zoomable="false"
                                                            style="margin-bottom: 1rem;"
                                                            />
                                                        <button @click="finalImgSrc!== '' ? cancelCropAfterSelect() : cancelCrop()" class="shadow-sm" style="background: #e0e0e0; color: black; border-radius: 2px; border: none; margin-right: 0.5rem; font-weight: 500; height: 2rem; width: 6rem">Cancel</button>
                                                        <button @click="setImage" class="shadow-sm" style="background: #34b14f;
                                                            color: white;
                                                            border-radius: 2px;
                                                            border: none;
                                                            font-weight: 500;
                                                            height: 2rem;
                                                            width: 8rem;">
                                                            Use Image
                                                        </button>
                                                    </section> 
                                                    <div class = "row" v-if="finalImgSrc != '' && !cropping" style="margin-top: 2rem;">
                                                        <div class = "col-4 text-center">
                                                            <p class="bold-text">Your event image: </p>
                                                            <img v-if="finalImgSrc != ''" :src="finalImgSrc" style="width: 110px; height: 110px; border-radius: 50%; border: 2px solid #34b14f"/>
                                                        </div>
                                                        <div class = "col-8" style="margin-top: 3rem;">
                                                            <div class = "items-list">
                                                                <li>Almost there! All users on the main explore page will be able to see your engagement photo</li>
                                                            
                                                            </div>
                                                            <button @click="adjustCrop" style="margin-top: 1rem; color: white;
                                                            background: #34b14f
                                                            border-radius: 3px;
                                                            border: none;
                                                            font-weight: 500;
                                                            height: 2rem;
                                                            width: 9rem;">Change Crop</button>
                                                        </div>
                                                    </div>  
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow gray-section">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Add a video for your engagement (optional)</p>
                                                    <button class="choose-image-button"  @click="onPickVideo">Upload Video</button>
                                                    <span v-if="eventPayload.event_video != null ">{{eventPayload.event_video.name}}</span>
                                                    <input type="file" accept="video/*" @change="onVideoSelected" style="display:none;" ref="VideoInput"/>
                                                    <i v-if="eventPayload.event_video != null" class="fa fa-trash" @click="removeVideo" style="margin-left: 1rem" />
                                
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="back-button shadow" @click="decrementStage">
                                                        Back
                                                    </button>
                                                    <button 
                                                        :class="[eventPayload.event_image === null ? 'inactive-next shadow-none' : 'active-next shadow']"
                                                        :disabled="eventPayload.event_image === null"
                                                        @click="onReview ? backToReview() : incrementStage()"
                                                    >
                                                        {{ onReview ? 'Update' : 'Next'}}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="stage===7">
                            <div class="row">
                                <div class = "col">
                                    <div class = "card shadow-md gray-section">
                                        <div class = "card-body">
                                            <div class = "row">
                                                <div class = "col title-column">
                                                    <p class="title-text" style="margin-bottom: 0.5rem; margin-top: 0.5rem">Review and Create</p>
                                                </diV>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="create-engagement-button shadow" @click="registerEvent">{{ createButton }}</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body white-section">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class="bold-text-title">Title</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                   <button class="edit-button shadow-sm" @click="goToStage(0)">Edit</button>
                                                </div>
                                            </div>
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Title</p>
                                                    <p class="info-text-edit">{{eventPayload.event_name}}</p>
                                                    <p class="bold-text">Tags and Keywords: </p>
                                                    <multiselect v-model="eventPayload.tags"
                                                        :options="allTags"
                                                        :multiple="true"
                                                        :close-on-select="true"
                                                        :clear-on-select="true"
                                                        :preserve-search="false"
                                                        :selectLabel="null"
                                                        :deselectLabel="null"
                                                        placeholder="Tags"
                                                        label="value"
                                                        track-by="value"
                                                        :taggable="false"
                                                        :preselect-first="false"
                                                        :disabled="true"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Description</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="edit-button shadow-sm" @click="goToStage(1)">Edit</button>
                                                </div>
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class = "bold-text">Description</p>
                                                    <p class="info-text-edit">{{eventPayload.event_description}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Time</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="edit-button shadow-sm" @click="goToStage(2)">Edit</button>
                                                </div>
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class = "bold-text">Date</p>
                                                    <p class="info-text-edit">{{eventPayload.date}}</p>
                                                    <p class = "bold-text">Start Time</p>
                                                    <p class = "info-text-edit">{{eventPayload.start_time}}</p>
                                                    <p class = "bold-text">End Time</p>
                                                    <p class = "info-text-edit">{{eventPayload.end_time}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Details</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="edit-button shadow-sm" @click="goToStage(3)">Edit</button>
                                                </div>
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class = "bold-text">Engagement Type</p>
                                                    <p class="info-text-edit">{{eventType}}</p>
                                                    <div v-if="eventPayload.event_type === 'in Person' || eventPayload.event_type === 'both'">
                                                        <p class = "bold-text">Physical Capacity</p>
                                                        <p class="info-text-edit">{{eventPayload.capacity}}</p>
                                                    </diV>
                                                    <div v-if="eventPayload.event_type === 'virtual' || eventPayload.event_type === 'both'">
                                                        <p class ="bold-text">Virtual Capacity</p>
                                                        <p class="info-text-edit">{{eventPayload.virtual_capacity}}</p>
                                                    </div>
                                                    <div v-if="eventPayload.event_type === 'virtual' || eventPayload.event_type === 'both'">
                                                        <p class ="bold-text">Virtual Conference Link</p>
                                                        <p class = "info-text-edit">{{eventPayload.zoom_link}}</p>
                                                    </div>
                                                    <p class = "bold-text">Host Contact Information</p>
                                                    <p class = "info-text-edit">{{eventPayload.host_contact}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Location</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="edit-button shadow-sm" @click="goToStage(4)">Edit</button>
                                                </div>
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class = "bold-text">Location</p>
                                                    <p class="info-text-edit">{{eventPayload.event_location}}</p>
                                                    <p class = "bold-text">Address</p>
                                                    <p class="info-text-edit">{{eventPayload.event_address}}</p>
                                                    <p class = "bold-text">Location Access Instructions</p>
                                                    <p class ="info-text-edit">{{eventPayload.event_location_access}}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Engagement Price</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="edit-button shadow-sm" @click="goToStage(5)">Edit</button>
                                                </div>
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class = "bold-text">Price Per Person</p>
                                                    <p class = "info-text-edit" v-if="eventPayload.event_free === 'yes'">Free</p>
                                                    <p class = "info-text-edit" v-else>${{eventPayload.event_price_per_person}}</p>
                                                    <p class = "bold-text">Charity Donations</p>
                                                    <p class = "info-text-edit">{{eventPayload.cause === 'no' || eventPayload.event_free === 'yes' ? 'None' : 'Yes'}}</p>
                                                    <div v-if="eventPayload.charity1 != '' && eventPayload.event_free !== 'yes'">
                                                        <p class = "bold-text">Charity 1</p>
                                                        <p class="info-text-edit">{{eventPayload.charity1}}</p>
                                                        <p class = "bold-text">Percentage to Charity 1</p>
                                                        <p class="info-text-edit">{{eventPayload.event_cause1}}%</p>
                                                    </div>
                                                    <div v-if="eventPayload.charity2 != '' && eventPayload.event_free !== 'yes'">
                                                        <p class = "bold-text">Charity 2</p>
                                                        <p class="info-text-edit">{{eventPayload.charity2}}</p>
                                                        <p class = "bold-text">Percentage to Charity 2</p>
                                                        <p class="info-text-edit">{{eventPayload.event_cause2}}%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Media</p>
                                                </div>
                                                <div class = "col text-right mt-auto mb-auto right-col">
                                                    <button class="edit-button shadow-sm" @click="goToStage(6)">Edit</button>
                                                </div>
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class = "bold-text">Engagement Photo</p>
                                                    <img v-if="finalImgSrc != ''" :src="finalImgSrc" style="width: 110px; height: 110px; border-radius: 50%; border: 2px solid #34b14f; margin-bottom: 1rem;"/>
                                                    <p class = "bold-text">Engagement Video</p>
                                                    <p class="info-text-edit">{{eventPayload.event_video != null ? eventPayload.event_video.name : 'None'}}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = "row">
                                <div class = "col">
                                    <div class = "card shadow">
                                        <div class = "card-body white-section-main">
                                            <div class = "row">
                                                <div class = "col info-column-with-title">
                                                    <p class = "bold-text-title">Post Engagement</p>
                                                </div>
                                                
                                            </div> 
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <p class="bold-text">Ready to Sparc the World?</p>
                                                    <div class = "items-list">
                                                        <li>You did it! Once your engagemnet has been posted, you can see it in the explore page</li>
                                                        <li>You can also view your hosted engagements in the 'Hosted Engagements' tab as well</li>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div class = "card-body buttons-section">
                                            <div class = "row">
                                                <div class = "col info-column">
                                                    <button class="create-engagement-button shadow" @click="registerEvent">{{ createButton }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
</template>

<script>
import {
  Button,
  Alert,
  Checkbox,
  Radio,
  FormGroupInput,
  Switch
} from '@/components';
import { DatePicker, TimePicker, TimeSelect } from 'element-ui';
import Multiselect from 'vue-multiselect'
import { mapGetters, mapActions } from 'vuex';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
    name: 'create_engagement',
    components: {
        Multiselect,
        Alert,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [DatePicker.name]: DatePicker,
    [TimePicker.name]: TimePicker,
    [TimeSelect.name]: TimeSelect,
    [FormGroupInput.name]: FormGroupInput,
    [Switch.name]: Switch,
    [Option.name]: Option,
    VueCropper,
  },
  computed: { 
      ...mapGetters(['allTags', 'eventCreated', 'charities']),
        invalidPriceStage() {
                return (
                    
                        (!(this.eventPayload.event_free === 'yes') && (
                            this.eventPayload.event_price_per_person < 1
                        )) ||
                        (!(this.eventPayload.event_free === 'yes') && this.eventPayload.cause === 'yes' && (
                            this.eventPayload.charity1 === '' || (this.eventPayload.event_cause1) < 1 || (this.eventPayload.event_cause1) > 100 || (this.eventPayload.charity2 != '' && ((this.eventPayload.event_cause2) < 1 || (this.eventPayload.event_cause2) > 100 || (parseInt(this.eventPayload.event_cause1) + parseInt(this.eventPayload.event_cause2) > 100)))
                        ))
                    
                )
        },
        eventType() {
                if(this.eventPayload.event_type === 'in Person') {
                    return 'in-Person'
                } else if (this.eventPayload.event_type === 'both') {
                    return 'in-Person & Virtual'
                } else {
                    return 'Virtual'
                }
        }
    },
  data() {
      return {
          // imageKey: 0,
        file: '',
        createButton: 'Create Engagement Now',
        pickerOptions: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
        },
        timeValue: {
        HH: "10",
        mm: "05",
        ss: "00"
        },
        stage: 0,
        imgSrc: '',
        imgFileName: '',
        finalImgSrc: '',
        cropping: false,
        onReview: false,
        eventPayload: {
            created_by: null,
            event_name: '',
            charity1: '',
            charity2: '',
            deleted: false,
            event_location: '',
            event_address: '',
            event_location_access: '',
            // event_space: null,
            host_contact: '',
            zoom_link: '',
            capacity: null,
            virtual_capacity: null,
            // google_link: null,
            event_cause1: null,
            event_cause2: null,
            event_price_per_person: null,
            cause: 'no',
            event_free: 'yes',
            event_type: 'in Person',
            tags: [],
            date: null,
            start_time: null,
            end_time: null,
            event_description: '',
            image_true: false,
            event_image: null,
            event_video: null,
        },
        warning: false,
        message: '',
        interestId: [],
        allCharites: []
      }
  },
  methods: {
      ...mapActions(['fetchTags','createEvent', 'fetchCharities', 'updateTags']),

      goToStage(stage){
          this.stage = stage;
          window.scrollTo(0, 0);
      },

      backToReview() {
        this.stage = 7;
        window.scrollTo(0, 0);
      },

      cancelCrop() {
          this.cropping=false;
          this.imgSrc = '';
          this.imgFileName = '';
          this.eventPayload.event_image = null;
      },
      cancelCropAfterSelect() {
          this.cropping=false;
      },
      adjustCrop() {
          this.cropping=true;
      },
      setImage() {
          window.scrollTo(0,0)
          this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
              blob.lastModifiedDate = new Date();
              blob.name = this.imgFileName;
              this.eventPayload.event_image = blob;
          });
          this.cropping=false;
          this.finalImgSrc = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },

      incrementStage() {
          this.stage++;
          if(this.stage === 7) {
              this.onReview = true;
          }
          window.scrollTo(0,0)
      },
      onPickImage() {
        this.$refs.ImageInput.value=null;
       this.$refs.ImageInput.click();
      },
      onPickVideo() {
          this.$refs.VideoInput.value=null;
          this.$refs.VideoInput.click();
      },
      
      removeVideo() {
          this.eventPayload.event_video = null;
      },
      decrementStage() {
          this.stage--;
          window.scrollTo(0,0)
      },
      registerEvent() {
          this.createButton = "Loading..."
          const newDate = this.eventPayload.date.toLocaleDateString()
          this.eventPayload.date = newDate

            if(this.eventPayload.tags != null) {
                this.eventPayload.tags.forEach(item => {
                this.interestId.push(item.id)
                })
                this.eventPayload.tags.forEach(item => {
                    item.count++
                    console.log(item)
                    this.updateTags(item)
                })
            }

          this.eventPayload.tags = this.interestId

          this.createEvent(this.eventPayload);

      },
      onFileSelected(event) {
            this.cropping=true
            this.finalImgSrc = ''

          let file = event.target.files[0]
          if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                this.imgSrc = event.target.result;
                // rebuild cropperjs with the updated source
                this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
           } else {
                alert('Sorry, FileReader API not supported');
           }
          this.imgFileName = file.name
        //   var extension = file.name.substring(file.name.lastIndexOf('.')+1);
        //   // show image here
        //   // image_true = file.name;
        //   this.imageKey = 1
        //   // vm.$forceUpdate();
        //   // forceRerender();
        //   // vm.$set('image_true', true)
        //   // forceRerender();
      },
      onVideoSelected(event) {
          let video = event.target.files[0];
          this.eventPayload.event_video = video
          console.log(this.eventPayload.event_video.name);
      }
  },
  created() {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(loggedUser != null) {
        this.eventPayload.created_by = loggedUser.id
    }
    this.fetchTags();
    this.fetchCharities()
  },

  watch: {
      eventCreated(val) {
          if(val == 'success') {
              this.$router.push({path: '/host'})
          }
      },
      'eventPayload.cause': function(val) {
          if (val !== 'no') {
              this.eventPayload.event_cause1 = null;
            this.eventPayload.event_cause2 = null;
            this.eventPayload.charity1 = '';
            this.eventPayload.charity2 = '';
          }
      },
      'eventPayload.event_free': function(val) {
          if (val === 'yes') {
              this.eventPayload.event_price_per_person = null;
              this.eventPayload.event_cause1 = null;
            this.eventPayload.event_cause2 = null;
            this.eventPayload.charity1 = '';
            this.eventPayload.charity2 = '';
          }
      },
      'eventPayload.event_type': function(val) {
          if (val === 'in Person') {
              this.eventPayload.virtual_capacity = null;
              this.eventPayload.zoom_link = '';
          } else if (val === 'virtual') {
              this.eventPayload.capacity = null;
          }
      }
      

  }
}
</script>

<style scoped>

.edit-button {
    background: whitesmoke;
    border: none;
    color: #34b14f;
    width: 6rem;
    height: 2.5rem;
    font-weight: 600;
    border-radius: 2px;
}

.choose-image-button {
    background: #f4f4f4;
    border: 1px solid lightgray;
    border-radius: 3px;
    margin-right: 1rem;
}

.create-engagement-button {
    background: #34b14f;
    color: white;
    border-radius: 2px;
    width: 15rem;
    height: 3rem;
    font-weight: 600;
    border: none;
}

.back-button {
    background: white;
    color: #34b14f;
    border-radius: 2px;
    border: none;
    width: 8rem;
    height: 2.5rem;
    font-weight: 600;
    margin-right: 1.5rem;
}

.inactive-next {
    background: #e0e0e0;
    color: #a0a0a0;
    border-radius: 2px;
    border: none;
    width: 8rem;
    height: 2.5rem;
    font-weight: 600;
}

.active-next {
    background: #34b14f;
    color: white;
    border-radius: 2px;
    border: none;
    width: 8rem;
    height: 2.5rem;
    font-weight: 600;

}

.title-text {
    font-weight: 600;
    font-size: 22px;
    color: #484848;
    margin-bottom: 0px;
}

.step-progress-text {
    font-weight: 400;
    font-size: 14px;
    margin-top: -6px;
}

.title-column{
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0rem;
}

.right-col {
    margin-right: 1rem;
}

.info-column {
    margin-top: 0.75rem;
    margin-left: 1rem;
    margin-bottom: 1.25rem;
    margin-right: 1rem;
}

.info-column-with-title {
    margin-top: 0.75rem;
    margin-left: 1rem;
    margin-right: 1rem;
}

.items-list {
    color: #484848;
    margin-top: -0.75rem;
    margin-left: 0.5rem;
    font-weight: 500;
}

.info-text {
    color: #484848;
    font-weight: 500;
    font-size: 14px;
}

.info-text-edit {
    color: #484848;
    font-weight: 500;
    font-size: 14px;
    margin-top: -0.75rem;
}

.gray-section {
    background: #f9f9f9
}

.white-section {
    border-top: 0.25px solid #e0e0e0;
    background: white;
}

.white-section-main {
    background: white;
}

.buttons-section {
    border-top: 0.25px solid #e0e0e0;
}

.bold-text {
    font-weight: bold;
    color: #484848;
    font-size: 14px;
}

.bold-text-title {
    font-weight:bold;
    color: #484848;
    font-size: 18px;
}

.error-text {
    font-weight: bold;
    color: #c91512;
    font-size: 12px;
}

.step-card {
    margin-top: 0px;
    margin-bottom: 0px;
    width: 90%;
    z-index: 1
}

.step-card-inactive {
    z-index: 0
}

.inactive-step-text {
    color: #a0a0a0;
    font-weight: bold;
margin-bottom: 1px;    
font-size: 14px;
}

.completed-step-text {
    font-weight: bold;
    color: #484848;
margin-bottom: 1px;
    font-size: 14px;
}

.active-step-text {
    font-weight: bold; color: #34b14f; margin-bottom: 0;
    font-size: 14px;
    margin-bottom: 1px;
}

.inactive-icon {
    color: #a0a0a0;
}

.inactive-icon-check {
    color: #e0e0e0
}

.completed-icon {
    color: #484848
}

.active-icon {
    color: #34b14f
}

.completed-inactive-card-body {
    background: #f2f2f2;
    opacity: 100;
}

.active-card-body {
    background: #f9f9f9;
    border-left: 4.5px solid #34b14f;
}

.image-cropper {
    height: 200px;
}

.main {
    border: 1px solid transparent;
}

</style>
