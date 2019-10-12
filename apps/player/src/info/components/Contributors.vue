<template lang="pug">
  div(v-if="Object.keys(groups).length > 0")
    div.contributors(v-for="title in Object.keys(groups)" :key="title")
      h3.title {{ title }}
      ul.list#tab-info--contributors
        li.contributor(v-for="(contributor, index) in groups[title]" :key="index")
          img.shadowed.avatar(:src="contributor.avatar" title="contributor.name" :alt="$t('A11Y.CONTRIBUTOR_COVER', { name: contributor.name })")
          div.personal-info
            span.name {{ contributor.name }}
            span.role {{ contributor.role && contributor.role.title }}
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    contributors: select.contributors
  }),
  computed: {
    groups: function() {
      const contributorList = this.contributors.map(contributor => contributor.group.title)
      const uniqueGroups = new Set(contributorList)
      const groupsWithContributors = {}
      for (const groupTitle of uniqueGroups.values()) {
        const groupContributers = this.contributors.filter(
          contributor => contributor.group.title === groupTitle
        )
        groupsWithContributors[groupTitle] = groupContributers
      }
      return groupsWithContributors
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.contributors {
  .list {
    display: flex;
    flex-wrap: wrap;
  }

  .contributor {
    display: flex;
    width: 33%;
    padding: ($padding / 2);
    overflow: hidden;
    align-items: center;
  }

  .avatar {
    border-radius: 4px;
    width: $info-contributor-avatar-size;
    height: auto;
    margin: $margin / 4;
  }

  .personal-info span {
    display: block;
    margin: $margin / 4;

    &.role {
      font-style: italic;
      font-size: smaller;
    }
  }
}

@media screen and (max-width: $width-m) {
  .contributors {
    .contributor {
      width: 100%;
    }
  }
}

@media screen and (min-width: $width-m) and (max-width: $width-l) {
  .contributors {
    .contributor {
      width: 50%;
    }
  }
}
</style>
