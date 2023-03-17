<template>
  <article class="layout-grid-item product-item product-area">
    <figure class="product-item-thumbnail">
      <a
        :href="item.custom_url.url"
        :title="item.name"
        class="product-item-link"
        @click="trackEvent(item, index, 'click')"
      >
        <img
          v-lazy="{
            src: item.image,
            error: 'https://via.placeholder.com/220/eee'
          }"
          class="product-item-image"
        />
      </a>
      <div class="product-item-badges">
        <span v-if="isOnSale" class="sale-badge product-item-sale-tag">
          Sale
        </span>
        <span
          v-if="item.out_of_stock_message"
          class="oos-badge product-item-out-of-stock"
        >
          {{ item.out_of_stock_message }}
        </span>
      </div>
      <ul class="product-item-actions">
        <li v-if="context.showProductQuickView">
          <span
            :data-product-id="item.id"
            class="product-item-action quick-shop-trigger"
          >
            {{ context.langQuickView }}
          </span>
        </li>
        <li v-if="item.option_set_id">
          <a :href="item.custom_url.url" data-event-type="product-click">
            <span class="product-item-action">
              {{ context.langChooseOptions }}
            </span>
          </a>
        </li>
        <li v-else-if="item.availability === 'preorder'">
          <a
            :href="'/cart.php?action=add&amp;product_id=' + item.id"
            data-event-type="product-click"
            :data-product-id="item.id"
          >
            <span class="button-text product-item-action">
              {{ context.langPreOrder }}
            </span>
          </a>
        </li>
        <li
          v-else-if="
            item.inventory_tracking === 'product' && item.inventory_level === 0
          "
        >
          <a :href="item.custom_url.url" data-event-type="product-click">
            <span class="product-item-action"> View Details </span>
          </a>
        </li>
        <li v-else>
          <a
            :href="'/cart.php?action=add&amp;product_id=' + item.id"
            data-product-add-to-cart
            :data-product-id="item.id"
            :data-product-title="item.name"
            data-progress-text="Adding..."
            @click="trackEvent(item, index, 'add2cart')"
          >
            <span class="button-text product-item-action">
              {{ context.langAddToCart }}
            </span>
          </a>
        </li>
        <li v-if="context.showCompare">
          <label :for="'compare-' + item.id">
            <input
              :id="'compare-' + item.id"
              class="input-checkbox product-item-compare"
              type="checkbox"
              name="products[]"
              :value="item.id"
            />
            <span class="product-item-action">
              {{ context.langCompare }}
            </span>
          </label>
        </li>
      </ul>
    </figure>
    <div class="product-item-details">
      <span v-if="item.brand" class="product-item-brand">
        {{ item.brand | value }}
      </span>
      <h3 class="product-item-title">
        <a
          :href="item.custom_url.url"
          @click="trackEvent(item, index, 'click')"
        >
          <span v-html="item.name"></span>
        </a>
      </h3>
      <div class="price product-item-price">
        <p v-if="!context.customer && context.restrictToLogin">
          Log in for pricing
        </p>
        <div
          v-else
          class="price-withouttax"
          data-product-price-wrapper="without-tax"
        >
          <div v-if="item.retail_price" class="price-rrp-wrapper">
            <label class="price-rrp-label">
              {{ context.pdpRetailPriceLabel }}
            </label>
            <span class="price-rrp" data-price-rrp>
              {{ item.retail_price | currency }}
            </span>
          </div>
          <div v-if="isOnSale" class="price-ns-wrapper">
            <label class="price-ns-label">
              {{ context.pdpNonSalePriceLabel }}
            </label>
            <span class="price-ns" data-price-rrp>
              {{ item.price | currency }}
            </span>
          </div>
          <div class="price-value-wrapper">
            <label v-if="isOnSale" class="price-value-label">
              {{ context.pdpSalePriceLabel }}
            </label>
            <label v-else class="price-label">
              {{ context.pdpPriceLabel }}
            </label>
            <span class="price-value" data-product-price>
              {{ item.calculated_price | currency }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import Hits from './Hits.js'
import EventHandlers from './EventHandlers.js'

export default {
  components: {},
  mixins: [Hits, EventHandlers],
  props: {
    item: {
      type: Object,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    isOnSale() {
      return this.item.price !== this.item.calculated_price
    }
  }
}
</script>
