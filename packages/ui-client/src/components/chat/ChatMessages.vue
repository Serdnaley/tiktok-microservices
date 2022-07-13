<script setup>
import { useMessagesStore } from '@/stores/messages';
import { nextTick, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import Button from '../Button.vue';
import { useAuthStore } from '@/stores/auth';
import { DateTime } from 'luxon';

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
  messagesByDays,
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

const formatDate = (date) => {
  return DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat('dd MMMM yyyy');
};
const formatTime = (date) => {
  return DateTime.fromISO(date).toFormat('HH:mm');
};

const containerEl = ref(null);
const messagesByDaysProxy = ref([]);
watch(messagesByDays, () => {
  if (!containerEl.value) return;
  const { scrollHeight } = containerEl.value;
  messagesByDaysProxy.value = [...messagesByDays.value];
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

    <template v-for="({ date, messages }) in messagesByDaysProxy">
      <div class="ChatMessages__date">
        {{ formatDate(date) }}
      </div>
      <div
        v-for="message in messages"
        :key="message.id"
        :class="{
        'ChatMessages__message': true,
        'ChatMessages__message--mine': message.userId === profile.id,
      }"
      >
        <div class="ChatMessages__message-inner">
          {{ message.text }}
          <div class="ChatMessages__message-inner-time">
            {{ formatTime(message.createdAt) }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.ChatMessages {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &__date {
    display: flex;
    align-items: center;
    white-space: nowrap;
    color: var(--text-color-secondary);
    margin: 15px 0;

    &:after,
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--border-color-2);
      margin: 0 15px;
    }
  }

  &__message {
    display: flex;
    margin-bottom: 5px;

    &-inner {
      position: relative;
      padding: 10px;
      border-radius: 5px;
      background: var(--dark-bg);
      max-width: 80%;

      &-time {
        position: absolute;
        left: 5px;
        bottom: -16px;
        font-size: 8px;
        color: var(--text-color-secondary);
      }
    }

    $this: &;

    &--mine {
      justify-content: flex-end;

      #{ $this }-inner {
        background: var(--secondary-bg);

        &-time {
          left: initial;
          right: 5px;
        }
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
