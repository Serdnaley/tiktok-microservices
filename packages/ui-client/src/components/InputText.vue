<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: true },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  accept: { type: String, default: null },
  max: { type: String, default: null },
  maxlength: { type: String, default: null },
  min: { type: String, default: null },
  minlength: { type: String, default: null },
  name: { type: String, default: null },
  pattern: { type: String, default: null },
  placeholder: { type: String, default: null },
  multiple: Boolean,
  autofocus: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
});

const emit = defineEmits({
  'update:modelValue': {
    type: String,
  },
});

const model = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => (model.value = value),
  { immediate: true },
);
watch(model, (value) => emit('update:modelValue', value));
</script>

<template>
  <label class="InputText">
    <span v-if="label || $slots.label" class="InputText__label">
      <slot name="label">
        {{ label }}
      </slot>
    </span>

    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      v-bind="{
        type,
        accept,
        autofocus,
        disabled,
        max,
        maxlength,
        min,
        minlength,
        multiple,
        name,
        pattern,
        placeholder,
        readonly,
        required,
      }"
      :value="model"
      class="InputText__input"
      @input="model = $event.target.value"
    />
  </label>
</template>

<style lang="scss">
.InputText {
  display: block;
  width: 100%;

  &__label {
    display: block;
    font-weight: 700;
    font-size: 16px;
    line-height: 17px;
    margin-bottom: 8px;
    color: var(--text-color-dark);
  }

  &__input {
    width: 100%;
    padding: 16px 20px;
    border: 1px solid var(--border-color);
    border-radius: 30px;
    display: flex;
    align-items: center;

    &::placeholder {
      color: var(--text-color-secondary);
    }
  }
}
</style>
