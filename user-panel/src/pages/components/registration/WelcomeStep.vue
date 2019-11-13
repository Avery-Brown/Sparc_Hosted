<template>
<div style="padding: 2rem 3rem; text-align: center;">
    <div class="field">
        <div class = "control">
        <fg-input
            id="login_input"
            class="no-border input-lg"
            addon-left-icon="now-ui-icons users_single-02"
            placeholder="First Name"
            v-model="form.firstName"
            type="text">
        </fg-input>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <fg-input
                id="login_input"
                :class="['input-lg no-border', ($v.form.lastName.$error) ? 'is-danger' : '']"
                addon-left-icon="now-ui-icons users_single-02"
                placeholder="Last Name"
                v-model="form.lastName"
                type="text">
            </fg-input>
        </div>
    </div>
</div>
</template>
<script>
import {validationMixin} from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'
import { FormGroupInput } from '@/components'

export default {
    props: ['clickedNext', 'currentStep'],
    mixins: [validationMixin],
    components: {
            [FormGroupInput.name]: FormGroupInput,

    },
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
            }
        }
    },
    validations: {
        form: {
                firstName: {
                    required
                },
                lastName: {
                    required
                }
            }
    },
    watch: {
            $v: {
                handler: function (val) {
                    if(!val.$invalid) {
                        this.$emit('can-continue', {value: true});
                    } else {
                        this.$emit('can-continue', {value: false});
                        setTimeout(()=> {
                            this.$emit('change-next', {nextBtnValue: false});
                        }, 3000)
                    }
                },
                deep: true
            },
            clickedNext(val) {
                console.log(val);
                if(val === true) {
                    this.$v.form.$touch();
                }
            }
        },
        mounted() {
            if(!this.$v.$invalid) {
                this.$emit('can-continue', {value: true});
            } else {
                this.$emit('can-continue', {value: false});
            }
        }
}
</script>
<style>
#reg-input {
    border-radius: 50px;
  }
</style>