<template>
  <div>
    <!-- BANNER TELLING USER THAT WALLET IS NOT BACKED UP -->
    <q-banner class="bg-secondary text-white column q-py-md q-mb-lg" :inline-actions="false">
      <div class="row justify-between items-center no-wrap">
        <q-icon class="col-auto" color="white" name="warning" size="md" />
        <div class="col q-ml-md">
          Your wallet is only accessible from this device. Back it up, take it with you.
        </div>
      </div>
      <div class="row justify-start q-mt-md">
        <base-button
          :flat="true"
          class="col-auto q-mr-lg"
          color="white"
          label="Show Recovery Seed"
          @click="showSeedPhrase = true"
        />
        <base-button
          :flat="true"
          class="col-auto"
          color="white"
          label="Save Wallet"
          @click="showSaveFile = true"
        />
      </div>
    </q-banner>

    <!-- DIALOG THAT HANDLES SAVE FILE FLOW -->
    <q-dialog v-model="showSaveFile" @hide="reset">
      <q-card class="q-px-md">
        <!-- Header Section -->
        <q-card-section class="row items-center justify-between">
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Save Walllet</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <!-- Prompt user for password to unlock wallet -->
        <q-card-section v-if="!isPasswordVerified" class="q-pt-none">
          <div class="text-center q-mt-md q-mb-lg">
            Your wallet is accessible by a seed phrase. The seed phrase is an ordered 12-word secret
            phrase.
            <br /><br />
            To create a backup of this seed phrase, enter your password below. This will save a file
            containting the encrypted contents to your device, and it can be decrypted using the
            same password.
          </div>
          <q-form ref="form" @submit="saveWalletFile">
            <div class="row justify-center">
              <base-input
                v-model="password"
                class="col"
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
                :loading="isLoading"
                type="submit"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>

        <div v-else-if="isBackupComplete" class="text-center">
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
          <q-btn v-close-popup class="q-mb-lg" label="Done" color="primary" />
        </div>
      </q-card>
    </q-dialog>
    <!-- END DIALOG THAT HANDLES SAVE FILE FLOW -->

    <!-- DIALOG THAT HANDLES SEED PHRASE FLOW -->
    <q-dialog v-model="showSeedPhrase" @hide="reset">
      <q-card class="q-px-md">
        <!-- Header Section -->
        <q-card-section class="row items-center justify-between">
          <q-btn icon="close" flat round dense style="opacity: 0; cursor: default;" />
          <h6 class="text-primary q-my-none">Recovery</h6>
          <q-btn v-close-popup icon="close" color="primary" flat round dense />
        </q-card-section>

        <!-- Prompt user for password to unlock wallet -->
        <q-card-section v-if="!isPasswordVerified" class="q-pt-none">
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
                class="col"
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
              <base-button label="Next" color="primary" :loading="isLoading" type="submit" />
            </q-card-actions>
          </q-form>
        </q-card-section>

        <!-- If user verified password, show them the seed phrase -->
        <div v-else-if="isPasswordVerified && currentTestIndex === -1">
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
        <div v-else-if="isBackupComplete" class="text-center">
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
          <q-btn v-close-popup class="q-mb-lg" label="Done" color="primary" />
        </div>

        <!-- Test user on seed phrase -->
        <div v-else class="text-center">
          <div class="row justify-center q-my-md">
            <q-icon class="q-mx-sm" :color="icons[0].color" :name="icons[0].name" />
            <q-icon class="q-mx-sm" :color="icons[1].color" :name="icons[1].name" />
            <q-icon class="q-mx-sm" :color="icons[2].color" :name="icons[2].name" />
          </div>
          <div v-if="!isWrong">
            <div>
              {{ testWords[currentTestIndex].text }}
            </div>
            <div class="text-caption text-italic text-grey">
              {{ testWords[currentTestIndex].caption }}
            </div>
          </div>
          <div v-else>{{ testFailureString }}</div>
          <h6 class="text-primary">What is the {{ currentTestNumber }} word?</h6>
          <div class="row justify-evenly">
            <base-button :label="currentTestWordChoices[0]" @click="checkAnswer(0)" />
            <base-button :label="currentTestWordChoices[1]" @click="checkAnswer(1)" />
            <base-button :label="currentTestWordChoices[2]" @click="checkAnswer(2)" />
            <base-button :label="currentTestWordChoices[3]" @click="checkAnswer(3)" />
          </div>
          <div class="row justify-center q-mt-md">
            <base-button :flat="true" label="Back to the Words" @click="backToWords" />
          </div>
        </div>

        <q-card-actions v-if="isPasswordVerified" align="right">
          <base-button
            v-if="currentTestIndex === -1"
            label="Next"
            color="primary"
            :loading="isLoading"
            @click="seedPhraseHandler"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- END DIALOG THAT HANDLES SEED PHRASE FLOW -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { exportFile, LocalStorage } from 'quasar';
import Wallet from 'src/wallet/Wallet';
import helpers from 'src/utils/mixin-helpers';

interface TestWord {
  index: number;
  word: string;
  text: string;
  caption: string;
  choices: number[];
}

interface IconStatus {
  name: string;
  color: string;
}

export default Vue.extend({
  name: 'WalletBackupPrompt',

  mixins: [helpers],

  data() {
    return {
      showSeedPhrase: false, // shows seed phrase dialog if true
      showSaveFile: false, // shows save file dialog if true
      password: '',
      isPasswordVisible: '',
      isPasswordVerified: false,
      isBackupComplete: false, // true once user completes either process
      isLoading: false,
      isWrong: false, // true if user incorrectly chooses a word from the seed phrase
      testWords: [
        // the words the user will be quizzed on, currently this is hardcoded
        {
          index: 9, // correct answer
          word: '9th',
          text: 'Make sure you wrote the phrase down correctly by answering this quick checkup.',
          caption: '',
          choices: [1, 9, 12, 5],
        },
        {
          index: 2,
          word: '2nd',
          text: 'Good job! Two more checks to go',
          caption: 'Be wary and cautious of your secret phrase. Never reveal it to anyone.',
          choices: [7, 8, 4, 2],
        },
        {
          index: 6,
          word: '6th',
          text: 'Awesome, one more to go!',
          caption:
            'It is recommended to keep several copies of your secret seed hidden away in different places.',
          choices: [6, 3, 10, 11],
        },
      ],
      testFailureString: 'Wrong. Retry or go back', // what to tell user when they choose wrong
      currentTestIndex: -1, // -1 indicates word quiz has not started, otherwise this indexes testWords
    };
  },

  computed: {
    ...mapState({
      seedPhrase(state): string {
        // @ts-ignore
        return String(state.main.wallet.mnemonic); // eslint-disable-line
      },
    }),

    seedPhraseArray(): string[] {
      return this.seedPhrase.split(' ');
    },

    currentTestNumber(): string {
      return this.currentTestIndex === -1 ? '' : this.testWords[this.currentTestIndex].word;
    },

    currentTestWordInfo(): TestWord {
      const dummy = { index: -1, word: '', text: '', caption: '', choices: [] };
      return this.currentTestIndex === -1 ? dummy : this.testWords[this.currentTestIndex];
    },

    currentTestWordChoices(): string[] {
      return this.currentTestIndex === -1
        ? []
        : [
            this.seedPhraseArray[this.testWords[this.currentTestIndex].choices[0] - 1],
            this.seedPhraseArray[this.testWords[this.currentTestIndex].choices[1] - 1],
            this.seedPhraseArray[this.testWords[this.currentTestIndex].choices[2] - 1],
            this.seedPhraseArray[this.testWords[this.currentTestIndex].choices[3] - 1],
          ];
    },

    icons(): IconStatus[] {
      const icons = [
        { name: 'brightness_1', color: 'grey' },
        { name: 'brightness_1', color: 'grey' },
        { name: 'brightness_1', color: 'grey' },
      ];
      icons.forEach((icon, index) => {
        if (this.currentTestIndex > index) {
          icons[index].color = 'green';
          icons[index].name = 'check';
        }
      });
      if (this.isWrong) {
        icons[this.currentTestIndex].name = 'close';
        icons[this.currentTestIndex].color = 'negative';
      }
      return icons;
    },
  },

  methods: {
    reset() {
      if (this.isBackupComplete) {
        this.$emit('backupComplete');
      }
      this.showSeedPhrase = false;
      this.password = '';
      this.isPasswordVisible = '';
      this.isPasswordVerified = false;
      this.isBackupComplete = false;
      this.currentTestIndex = -1;
      this.isLoading = false;
      this.isWrong = false;
    },

    backToWords() {
      this.currentTestIndex = -1;
    },

    async seedPhraseHandler() {
      if (this.isPasswordVerified) {
        this.nextTest();
      } else {
        await this.checkPassword();
      }
    },

    async checkPassword() {
      try {
        const encryptedMnemonic = LocalStorage.getItem('kaspa-wallet-data');
        await Wallet.import(this.password, encryptedMnemonic); // eslint-disable-line
        this.isPasswordVerified = true;
      } catch (err) {
        // @ts-ignore
        this.showError(err); // eslint-disable-line
        throw new Error(err); // to exit the top function
      }
    },

    checkAnswer(index: number) {
      if (this.currentTestWordInfo.choices[index] !== this.currentTestWordInfo.index) {
        this.isWrong = true;
      } else {
        this.isWrong = false;
        this.nextTest();
      }
    },

    nextTest() {
      this.currentTestIndex += 1;
      if (this.currentTestIndex === this.testWords.length) {
        this.onVerificationComplete();
      }
    },

    async saveWalletFile() {
      await this.checkPassword();
      const encryptedMnemonic = String(LocalStorage.getItem('kaspa-wallet-data'));
      const status = exportFile('kaspa-wallet-data.dag', encryptedMnemonic);
      if (!status) {
        // @ts-ignore
        this.showError('Browser denied file download'); // eslint-disable-line
      } else {
        this.onVerificationComplete();
      }
    },

    onVerificationComplete() {
      this.isBackupComplete = true;
      LocalStorage.set('is-backed-up', true);
    },
  },
});
</script>
