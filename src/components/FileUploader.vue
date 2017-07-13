<template>
<div class="uploaderBox">
  <div class="uploaderBox__input">
    <i class="fa fa-cloud-upload uploaderBox__icon"></i>

    <input type="file" id="file" class="uploaderBox__file"
           :name="uploadFieldName"
           :disabled="isSaving"
           :accept="accept"
           @change="filesChange($event.target.files)">
    <label for="file" v-if="!isDropped"><strong>Choose a file</strong><span class="uploaderBox__dragndrop"> or Drop files here to upload</span></label>
    <label for="file" v-if="isDropped"><strong>File Selected!</strong><span class="uploaderBox__dragndrop"></span></label>
    <!-- <button class="uploaderBox__button">Upload</button> -->
  </div>
  <div class="uploaderBox__uploading" v-if="isSaving">Uploading {{ fileCount }} files &hellip;</div>
  <div class="uploaderBox__success" v-if="isSuccess">Done!</div>
  <div class="uploaderBox__error" v-if="isFailed">Error! <span v-html="uploadError"></span></div>
</div>
</template>

<script>
import fileAPI from './../api/file-api.js'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3, STATUS_DRAGOVER = 4, STATUS_DROPPED = 5;

export default {
  props: {
    accept: {
      type: String,
      default: '*/*'
      // default: 'image/*'
    },

    autoUpload: {
      type: Boolean,
      default: true,
      // default: 'image/*'
    },
  },

  data () {
    return {
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'files',
      fileCount: 0,
    }
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    isDropped() {
      return this.currentStatus === STATUS_DROPPED;
    }
  },

  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.$store.dispatch('file/update', [])
      this.uploadError = null;
    },

    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      // const url = `${BASE_URL}/photos/upload`;
      fileAPI.create(formData, 
        x => {
          // this.uploadedFiles = [].concat(x);
          this.$store.dispatch('file/update', [].concat(x))
          this.currentStatus = STATUS_SUCCESS;
        },
        err => {
          this.uploadError = err.response || err.body;
          this.currentStatus = STATUS_FAILED;
        });
    },

    filesChange(fileList) {
      // console.log('uploader filesChange', fileList)
      const vm = this
      if (this.autoUpload) {
        // handle file changes
        const formData = new FormData();
        if (!fileList.length) return;
        vm.fileCount = fileList.length
        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(vm.uploadFieldName, fileList[x], fileList[x].name);
          });
        // save it
        this.save(formData);
      } else {
        let files = []
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
             files.push(fileList[x])
          });
        this.$store.dispatch('file/update', files)
        this.currentStatus = STATUS_DROPPED
        this.$emit('selected:file');
      }
      // console.log(this.uploadedFiles)
    }
  },

  mounted() {
    const vm = this
    const uploaderBox = $('.uploaderBox')
    this.reset()
    uploaderBox.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
    })
    .on('dragover dragenter', function() {
      uploaderBox.addClass('is-dragover');
      // vm.currentStatus = STATUS_DRAGOVER
    })
    .on('dragleave dragend drop', function() {
      uploaderBox.removeClass('is-dragover');
      // vm.currentStatus = STATUS_SAVING
    })
    .on('drop', function(e) {
      let droppedFiles = e.originalEvent.dataTransfer.files
      vm.filesChange(droppedFiles)
    });
  },
}
</script>