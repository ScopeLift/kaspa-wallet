<template>
  <q-page padding class="page-margin" data-cy="settings">
    <!-- SETTINGS LAYOUT -->
    <div class="row justify-between q-mx-md" data-cy="settings-container">
      <!-- CHANGE NETWORK -->
      <div class="col-xs-12" data-cy="settings-changeNetwork">
        <div class="text-caption text-uppercase text-grey">Connection</div>
        <div class="text-h6" data-cy="settings-changeNetwork-text">Change Network</div>
        <p>Choose how to connect to the network</p>
        <q-list>
          <!--
            Rendering a <label> tag (notice tag="label") so QRadios will respond to clicks 
            on QItems to change Toggle state.
          -->
          <q-item tag="label">
            <q-item-section avatar>
              <q-radio v-model="networkSelectionMethod" val="automatic" @input="updateNetwork" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Automatic</q-item-label>
              <q-item-label caption>
                The wallet will connect via one of the community managed Kasparov API servers
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label">
            <q-item-section avatar top>
              <q-radio v-model="networkSelectionMethod" val="manual" @input="updateNetwork" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manual</q-item-label>
              <q-item-label caption>Specify your own Kasparov API server </q-item-label>
              <q-item-label>
                <base-input
                  v-model="apiEndpoint"
                  :disabled="networkSelectionMethod !== 'manual'"
                  hint="Enter address:port"
                  style="min-width: 275px;"
                  @input="updateNetwork"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- WALLET BACKUP -->
      <div class="col-xs-12 q-mt-xl" data-cy="settings-walletBackup">
        <div class="text-caption text-uppercase text-grey">Recovery</div>
        <div class="text-h6" data-cy="settings-walletBackup-text">Wallet Backup</div>
        <p>Backup your wallet using your preferred method</p>
        <base-button
          label="Export Wallet File"
          data-cy="settings-walletBackup-file"
          :flat="true"
          @click="showFileBackup"
        />
        <base-button
          label="Show Wallet Seed"
          data-cy="settings-walletBackup-seed"
          :flat="true"
          @click="showSeedBackup"
        />
      </div>
    </div>

    <!-- DIALOG THAT HANDLES SAVE FILE FLOW -->
    <q-dialog v-model="showSaveFile" data-cy="wallet-backup-prompt-saveDialog" @hide="reset">
      <q-card class="q-px-md" data-cy="wallet-backup-prompt-saveDialog-header">
        <!-- Header Section -->
        <q-card-section class="row items-center justify-between">
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Save Wallet</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <!-- Prompt user for password to unlock wallet -->
        <q-card-section
          v-if="!isPasswordVerified"
          class="q-pt-none"
          data-cy="wallet-backup-prompt-saveDialog-introDiv"
        >
          <div class="text-center q-mt-md q-mb-lg">
            Your wallet is accessible by a seed phrase. The seed phrase is an ordered 12-word secret
            phrase.
            <br /><br />
            To create a backup of this seed phrase, enter your password below. This will save a file
            containting the encrypted contents to your device, and it can be decrypted using the
            same password.
          </div>
          <q-form
            ref="form"
            data-cy="wallet-backup-prompt-saveDialog-form"
            @submit="saveWalletFile"
          >
            <div class="row justify-center">
              <base-input
                v-model="password"
                :autofocus="true"
                class="col"
                data-cy="wallet-backup-prompt-saveDialog-pwInput"
                :hint="passwordHint"
                :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                label="Password"
                style="min-width: 250px; max-width: 400px;"
                :type="isPasswordVisible ? 'text' : 'password'"
                :rules="checkPasswordRequirements"
                @iconClicked="isPasswordVisible = !isPasswordVisible"
                @input="resetFormValidations('form')"
              />
            </div>

            <q-card-actions align="right">
              <base-button
                v-if="!isBackupComplete"
                label="Next"
                color="primary"
                data-cy="wallet-backup-prompt-saveDialog-nextBtn"
                :loading="isLoading"
                type="submit"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>

        <div
          v-else-if="isBackupComplete"
          class="text-center"
          data-cy="wallet-backup-prompt-saveDialog-successDiv"
        >
          <div class="q-mt-md q-mb-lg">
            Great Success!<q-icon class="q-mx-sm" color="positive" name="check" />
          </div>
          <div class="q-mb-xl">
            <div>Remember...</div>
            <div>
              Anyone with this file and your password can access your wallet your funds. Keep it
              safe!
            </div>
          </div>
          <q-btn
            v-close-popup
            class="q-mb-lg"
            label="Done"
            color="primary"
            data-cy="wallet-backup-prompt-saveDialog-doneBtn"
          />
        </div>
      </q-card>
    </q-dialog>
    <!-- END DIALOG THAT HANDLES SAVE FILE FLOW -->

    <!-- DIALOG THAT HANDLES SEED PHRASE FLOW -->
    <q-dialog v-model="showSeedPhrase" data-cy="wallet-backup-prompt-seedDialog" @hide="reset">
      <q-card class="q-px-md">
        <!-- Header Section -->
        <q-card-section class="row items-center justify-between">
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Recovery</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <!-- Prompt user for password to unlock wallet -->
        <q-card-section
          v-if="!isPasswordVerified"
          class="q-pt-none"
          data-cy="wallet-backup-prompt-seedDialog-introDiv"
        >
          <div class="text-center q-mt-md q-mb-lg">
            Your wallet is accessible by a seed phrase. The seed phrase is an ordered 12-word secret
            phrase.
            <br /><br />
            Enter your password to reveal your seed phrase. Make sure no one is looking, as anyone
            with your seed phrase can access your wallet your funds. Keep it safe!
          </div>
          <q-form ref="form" @submit="seedPhraseHandler">
            <div class="row justify-center">
              <base-input
                v-model="password"
                :autofocus="true"
                class="col"
                data-cy="wallet-backup-prompt-seedDialog-pwInput"
                :hint="passwordHint"
                :icon-append="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                label="Password"
                style="min-width: 250px; max-width: 400px;"
                :type="isPasswordVisible ? 'text' : 'password'"
                :rules="checkPasswordRequirements"
                @iconClicked="isPasswordVisible = !isPasswordVisible"
                @input="resetFormValidations('form')"
              />
            </div>

            <q-card-actions align="right">
              <base-button
                label="Next"
                color="primary"
                :loading="isLoading"
                type="submit"
                data-cy="wallet-backup-prompt-seedDialog-quizUnlockBtn"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>

        <!-- If user verified password, show them the seed phrase -->
        <div
          v-else-if="isPasswordVerified && currentTestIndex === -1"
          data-cy="wallet-backup-prompt-seedDialog-quizIntroDiv"
        >
          <q-card-section class="text-center text-no-hyphens q-pt-none">
            Below is an ordered 12-word seed phrase, representing this wallet's seed. It's like a
            secret pass phrase. Write it down and keep it safe.
          </q-card-section>

          <q-card-section class="">
            <div class="row justify-between">
              <div
                v-for="(word, index) in seedPhraseArray"
                :key="index"
                class="text-center text-primary col-xs-3 q-mt-md"
                data-cy="wallet-backup-prompt-seedDialog-quizWordGrid"
              >
                <div>
                  {{ word }}
                </div>
                <div class="text-grey text-center text-caption">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="text-caption text-grey text-italic text-center">
            Cool fact: there are more 12-word phrase combinations than nanoseconds since the big
            bang!
          </q-card-section>
        </div>

        <!-- If user passed the seed phrase tests -->
        <div
          v-else-if="isBackupComplete"
          class="text-center"
          data-cy="wallet-backup-prompt-seedDialog-successDiv"
        >
          <div class="row justify-center q-mt-md">
            <q-icon class="q-mx-sm" color="positive" name="check" />
            <q-icon class="q-mx-sm" color="positive" name="check" />
            <q-icon class="q-mx-sm" color="positive" name="check" />
          </div>
          <div class="q-mt-md q-mb-lg">Great Success!</div>
          <div class="q-mb-xl">
            <div>Remember...</div>
            <div>
              Anyone with this 12-word phrase can access your wallet your funds. Keep it safe!
            </div>
          </div>
          <q-btn
            v-close-popup
            class="q-mb-lg"
            label="Done"
            color="primary"
            data-cy="wallet-backup-prompt-seedDialog-quizCloseBtn"
          />
        </div>

        <!-- Test user on seed phrase -->
        <div v-else class="text-center" data-cy="wallet-backup-prompt-seedDialog-quizDiv">
          <div class="row justify-center q-my-md">
            <q-icon class="q-mx-sm" :color="icons[0].color" :name="icons[0].name" />
            <q-icon class="q-mx-sm" :color="icons[1].color" :name="icons[1].name" />
            <q-icon class="q-mx-sm" :color="icons[2].color" :name="icons[2].name" />
          </div>
          <div v-if="!isWrong" data-cy="wallet-backup-prompt-seedDialog-quizMessageToUser">
            <div>
              {{ testWords[currentTestIndex].text }}
            </div>
            <div class="text-caption text-italic text-grey">
              {{ testWords[currentTestIndex].caption }}
            </div>
          </div>
          <div v-else data-cy="wallet-backup-prompt-seedDialog-quizDiv-wrongAnswer">
            {{ testFailureString }}
          </div>
          <h6 class="text-primary" data-cy="wallet-backup-prompt-seedDialog-quizQuestion">
            What is the {{ currentTestNumber }} word?
          </h6>
          <div class="row justify-evenly" data-cy="wallet-backup-prompt-seedDialog-quizAnswers">
            <base-button
              :label="currentTestWordChoices[0]"
              class="q-mx-md"
              data-cy="wallet-backup-prompt-seedDialog-quizAnswerBtn1"
              @click="checkAnswer(0)"
            />
            <base-button
              :label="currentTestWordChoices[1]"
              class="q-mx-md"
              data-cy="wallet-backup-prompt-seedDialog-quizAnswerBtn2"
              @click="checkAnswer(1)"
            />
            <base-button
              :label="currentTestWordChoices[2]"
              class="q-mx-md"
              data-cy="wallet-backup-prompt-seedDialog-quizAnswerBtn3"
              @click="checkAnswer(2)"
            />
            <base-button
              :label="currentTestWordChoices[3]"
              class="q-mx-md"
              data-cy="wallet-backup-prompt-seedDialog-quizAnswerBtn4"
              @click="checkAnswer(3)"
            />
          </div>
          <div class="row justify-center q-mt-md">
            <base-button
              :flat="true"
              label="Back to the Words"
              data-cy="wallet-backup-prompt-seedDialog-quizBackBtn"
              @click="backToWords"
            />
          </div>
        </div>

        <q-card-actions v-if="isPasswordVerified" align="right">
          <base-button
            v-if="currentTestIndex === -1"
            label="Next"
            color="primary"
            data-cy="wallet-backup-prompt-seedDialog-quizUnlockBtnBtn"
            :loading="isLoading"
            @click="seedPhraseHandler"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- END DIALOG THAT HANDLES SEED PHRASE FLOW -->
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import { LocalStorage } from 'quasar';
import WalletBackupPrompt from 'components/WalletBackupPrompt.vue';
// @ts-ignore
import helpers from 'src/utils/mixin-helpers';
import { SelectedNetwork } from 'custom-types';
import { DEFAULT_NETWORK } from '../../config.json';

export default Vue.extend({
  name: 'Settings',

  // Import the JS portion of WalletBackupPrompt, HTML is duplicated above for now
  extends: WalletBackupPrompt,

  mixins: [helpers],

  data() {
    return {
      // Defaul values
      networkSelectionMethod: 'automatic',
      apiEndpoint: 'http://localhost:11224',
    };
  },

  mounted() {
    const network = LocalStorage.getItem('kaspa-network');
    if (network && (network as SelectedNetwork).description === 'Manual Network') {
      this.networkSelectionMethod = 'manual';
    }
  },

  methods: {
    async updateNetwork() {
      if (this.networkSelectionMethod === 'automatic') {
        // Default network
        const network = DEFAULT_NETWORK;
        await this.$store.dispatch('main/setNetwork', network);
      } else {
        // Custom network
        const network = {
          prefix: 'kaspatest',
          description: 'Manual Network',
          apiBaseUrl: this.apiEndpoint,
        };
        await this.$store.dispatch('main/setNetwork', network);
      }
    },

    showFileBackup() {
      // @ts-ignore
      this.showSaveFile = true;
    },

    showSeedBackup() {
      // @ts-ignore
      this.showSeedPhrase = true;
    },
  },
});
</script>
