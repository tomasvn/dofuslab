/** @jsx jsx */

import * as React from 'react';
import { jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import { STAT_GROUPS, mq, SEARCH_BAR_ID } from 'common/constants';
import Layout from '../common/Layout';
import StatTable from '../common/StatTable';
import { ResponsiveGrid } from 'common/wrappers';

import {
  customSet,
  customSetVariables,
} from 'graphql/queries/__generated__/customSet';
import CustomSetQuery from 'graphql/queries/customSet.graphql';
import { getStatsFromCustomSet } from 'common/utils';
import SetHeader from '../common/SetHeader';
import EquipmentSlots from '../common/EquipmentSlots';
import { itemSlots_itemSlots } from 'graphql/queries/__generated__/itemSlots';
import StatEditor from '../common/StatEditor';
import { topMarginStyle } from 'common/mixins';
import Selector from '../common/Selector';

const SetBuilder: React.FC = () => {
  const router = useRouter();
  const { customSetId } = router.query;

  const { data: customSetData } = useQuery<customSet, customSetVariables>(
    CustomSetQuery,
    { variables: { id: customSetId }, skip: !customSetId },
  );

  const [
    selectedItemSlot,
    selectItemSlot,
  ] = React.useState<itemSlots_itemSlots | null>(null);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.keyCode === 27) {
        // escape key
        selectItemSlot(null);
      }
    }
    if (document) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document && document.removeEventListener('keydown', onKeyDown);
  }, []);

  React.useEffect(() => {
    const searchBar = document.getElementById(SEARCH_BAR_ID);
    if (searchBar) {
      searchBar.focus();
    }
  }, [selectedItemSlot]);

  const statsFromCustomSet = React.useMemo(
    () => getStatsFromCustomSet(customSetData?.customSetById),
    [customSetData],
  );

  return (
    <Layout>
      <SetHeader customSet={customSetData?.customSetById} />
      <EquipmentSlots
        customSet={customSetData?.customSetById}
        selectItemSlot={selectItemSlot}
        selectedItemSlotId={selectedItemSlot?.id ?? null}
      />
      <div
        css={{
          flex: '1 1 auto',
          overflowX: 'hidden',
          display: 'flex',
          [mq[1]]: {
            paddingLeft: 14,
          },
          [mq[4]]: {
            paddingLeft: 20,
          },
        }}
      >
        <div
          css={{
            flex: '1 1 282px',

            overflow: 'auto',
            ...topMarginStyle,
            [mq[1]]: { flex: '0 1 282px', ...(topMarginStyle[mq[1]] as {}) },
            [mq[2]]: { flex: '0 1 576px' },
          }}
        >
          <ResponsiveGrid
            numColumns={[2, 1, 2, 2, 2, 2, 2]}
            css={{ marginBottom: 20 }}
          >
            {STAT_GROUPS.map((group, i) => (
              <StatTable
                key={`stat-table-${i}`}
                group={group}
                statsFromCustomSet={statsFromCustomSet}
                customSet={customSetData?.customSetById}
              />
            ))}
            <StatEditor customSet={customSetData?.customSetById} />
          </ResponsiveGrid>
        </div>
        <Selector
          key={`selected-item-slot-${selectedItemSlot?.id}-level-${customSetData?.customSetById?.level}`}
          customSet={customSetData?.customSetById}
          selectItemSlot={selectItemSlot}
          selectedItemSlot={selectedItemSlot}
        />
      </div>
    </Layout>
  );
};

export default SetBuilder;
