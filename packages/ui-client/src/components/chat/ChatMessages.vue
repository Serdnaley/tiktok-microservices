<script setup>
import { useMessagesStore } from '../../stores/messages';
import { nextTick, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import Button from '../Button.vue';
import { useAuthStore } from '../../stores/auth';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

const {
  profile,
} = storeToRefs(useAuthStore());
const {
  isEnd,
  chatId,
  isLoading,
  messagesSorted,
} = storeToRefs(useMessagesStore());
const {
  resetMessages,
  fetchMessages,
  loadMoreMessages,
} = useMessagesStore();

watch(() => props.chat.id, () => {
  resetMessages();
  chatId.value = props.chat.id;
  fetchMessages();
}, { immediate: true });

const loadMore = async () => {
  await loadMoreMessages();
};

const containerEl = ref(null);
const messagesSortedProxy = ref([]);
watch(messagesSorted, () => {
  if (!containerEl.value) return;
  const { scrollHeight } = containerEl.value;
  messagesSortedProxy.value = [...messagesSorted.value];
  nextTick(() => {
    containerEl.value.scrollTop += containerEl.value.scrollHeight - scrollHeight;
  });
}, { deep: true, immediate: true });
</script>

<template>
  <div class="ChatMessages" ref="containerEl">
    <Button
      v-if="!isLoading && !isEnd"
      class="ChatMessages__load-more"
      @click="loadMore"
    >
      Load more
    </Button>

    <div v-if="isLoading" class="ChatMessages__loading">
      Loading...
    </div>

    <div
      v-for="message in messagesSortedProxy"
      :key="message.id"
      :class="{
        'ChatMessages__message': true,
        'ChatMessages__message--mine': message.userId === profile.id,
      }"
    >
      <div class="ChatMessages__message-inner">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ChatMessages {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &__message {
    display: flex;
    margin-bottom: 5px;

    &-inner {
      padding: 10px;
      border-radius: 5px;
      background: var(--dark-bg);
      max-width: 80%;
    }

    $this: &;

    &--mine {
      justify-content: flex-end;

      #{ $this }-inner {
        background: var(--secondary-bg);
      }
    }
  }

  &__load-more {
    width: 100%;
    margin: 50px auto;
  }

  &__loading {
    width: 100%;
    text-align: center;
    margin: 50px 0;
  }
}
</style>
