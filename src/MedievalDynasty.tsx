import { lazy, Suspense, useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, InputGroup, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import useLocalStorage from './useLocalstorage.ts';
import { Diff, diff } from 'deep-diff';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RenderDiff from './controls/MedievalDynasty/RenderDiff.tsx';
import { recipes } from './data/MedievalDynasty';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import ItemEffectsList from '@/controls/MedievalDynasty/ItemEffectsList.tsx';

const Calculator = lazy(() => import('./controls/MedievalDynasty/Calculator.tsx'));
const Recipes = lazy(() => import('./controls/MedievalDynasty/Recipes.tsx'));
const Provides = lazy(() => import('./controls/MedievalDynasty/Provides.tsx'));
const Items = lazy(() => import('./controls/MedievalDynasty/Items.tsx'));
const BuildingList = lazy(() => import('./controls/MedievalDynasty/BuildingList.tsx'));

function MedievalDynasty() {
  const [tab, setTab] = useLocalStorage<string>('medieval_dynasty_tab', 'calculator');
  const [data, setData] = useLocalStorage<object>('medieval_dynasty', {});
  const [undoData, setUndoData] = useLocalStorage<object[]>('medieval_dynasty_undo', []);
  const [redoData, setRedoData] = useLocalStorage<object[]>('medieval_dynasty_redo', []);
  const [previousData, setPreviousData] = useState<string>();
  const [minSkillsSampleCount, setMinSkillsSampleCount] = useState(1);
  const loading = (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

  useEffect(() => {
    if (previousData == undefined) {
      setPreviousData(JSON.stringify(data));
    } else if (JSON.stringify(data) !== previousData) {
      const id = setTimeout(() => {
        if (JSON.stringify(data) !== previousData) {
          const undo: object[] = [...undoData, JSON.parse(previousData) as object];
          if (undo.length > 10) {
            undo.shift();
          }
          setUndoData(undo);
          setRedoData([]);
          setPreviousData(JSON.stringify(data));
        }
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [data, previousData, setRedoData, setUndoData, undoData]);

  function undo() {
    const undo = [...undoData];
    const redo = [...redoData];
    const current = undo.pop();
    if (current) {
      redo.push(data);
      setData(current);
      setPreviousData(JSON.stringify(current));
      setUndoData(undo);
      setRedoData(redo);
    }
  }

  function redo() {
    const undo = [...undoData];
    const redo = [...redoData];
    const current = redo.pop();
    if (current) {
      undo.push(data);
      setData(current);
      setPreviousData(JSON.stringify(current));
      setUndoData(undo);
      setRedoData(redo);
    }
  }

  function generateCSV() {
    const data: Record<string, (number | undefined)[]> = {};
    const csv: string[][] = [];
    let globalMaxSkill = 0;

    Object.values(recipes)
      .sort((a, b) => a.building.localeCompare(b.building) || a.name.localeCompare(b.name))
      .forEach((recipe) => {
        if (Object.values(recipe.skillSamples ?? {}).length >= minSkillsSampleCount) {
          const entries = Object.entries(recipe.skillSamples ?? {});
          const maxSkill = Math.max(...entries.map(([key]) => parseInt(key)));
          const dataKey = recipe.name + '@' + recipe.building;
          data[dataKey] = new Array(maxSkill).fill(undefined) as (number | undefined)[];
          entries.forEach(([key, value]) => {
            data[dataKey][parseInt(key) - 1] = value;
          });
          if (maxSkill > globalMaxSkill) {
            globalMaxSkill = maxSkill;
          }
        }
      });
    csv.push(['', ...new Array(globalMaxSkill).fill(0).map((_, i) => `${i + 1}`)]);
    csv.push(...Object.entries(data).map(([key, values]) => [key, ...values.map((value) => value?.toString() ?? '')]));
    const csvData = Papa.unparse(csv);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'skillSamples.csv');
  }

  async function toClipboard() {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  }

  async function fromClipboard() {
    await navigator.clipboard.readText().then((text) => {
      try {
        const json: unknown = JSON.parse(text);
        if (typeof json === 'object' && json !== null) {
          setData(json);
        }
      } catch (e) {
        console.error(e);
      }
    });
  }

  return (
    <>
      <div className="float-end">
        <ButtonGroup>
          <Button
            variant="dark"
            className="bi-arrow-counterclockwise"
            title="Undo"
            disabled={undoData.length == 0}
            onClick={() => undo()}
          />
          <Button
            variant="dark"
            className="bi-arrow-clockwise"
            title="Redo"
            disabled={redoData.length == 0}
            onClick={() => redo()}
          />
        </ButtonGroup>
      </div>
      <Tabs
        onSelect={(ev) => setTab(ev ?? 'calculator')}
        className="border-bottom-0"
        activeKey={tab}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab eventKey="calculator" title="Calculator" className="border p-3">
          <Suspense fallback={loading}>
            <Calculator />
          </Suspense>
        </Tab>
        <Tab eventKey="recipes" title="Recipes" className="border p-3">
          <Suspense fallback={loading}>
            <Recipes />
          </Suspense>
        </Tab>
        <Tab eventKey="provides" title="Provides" className="border p-3">
          <Suspense fallback={loading}>
            <Provides />
          </Suspense>
        </Tab>
        <Tab eventKey="effects" title="Effects" className="border p-3">
          <Suspense fallback={loading}>
            <ItemEffectsList />
          </Suspense>
        </Tab>
        <Tab eventKey="items" title="Items" className="border p-3">
          <Suspense fallback={loading}>
            <Items />
          </Suspense>
        </Tab>
        <Tab eventKey="buildings" title="Buildings" className="border p-3">
          <Suspense fallback={loading}>
            <BuildingList />
          </Suspense>
        </Tab>
        <Tab eventKey="json" title="JSON" className="border p-3">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Tab>
        <Tab eventKey="changes" title="Changes" className="border p-3">
          {[...undoData]
            .reverse()
            .map((undo, index) => [undo, index == undoData.length - 1 ? data : undoData[index + 1]])
            .map((undo): [object, object, Diff<any>[] | undefined] => [undo[0], undo[1], diff(undo[0], undo[1])])
            .map(([left, right, diffs], index) => (
              <RenderDiff diff={diffs} left={left} right={right} key={'D' + index} />
            ))}
        </Tab>
        <Tab eventKey="export" title="Export" className="border p-3">
          <Row>
            <InputGroup className="w-auto">
              <InputGroup.Text>Min Sample Count</InputGroup.Text>
              <Form.Control
                type="number"
                min={1}
                max={Object.values(recipes)
                  .filter((recipe) => recipe.skillSamples != undefined)
                  .map((recipe) => Object.keys(recipe.skillSamples ?? {}).length)
                  .reduce((a, b) => Math.max(a, b), 0)}
                value={minSkillsSampleCount}
                onChange={(ev) => setMinSkillsSampleCount(parseInt(ev.target.value))}
              />
              <Button onClick={() => generateCSV()}>Generate Skills Sample CSV</Button>
            </InputGroup>
            <InputGroup className="w-auto">
              <Button onClick={() => void toClipboard()}>Copy JSON</Button>
              <Button onClick={() => void fromClipboard()}>Paste JSON</Button>
            </InputGroup>
          </Row>
        </Tab>
      </Tabs>
    </>
  );
}

export default MedievalDynasty;
