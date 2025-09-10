import { useCallback, useEffect, useState } from 'react'
import './styles/app.css'
import './styles/bars.css'
import { Controls } from './components/Controls'
import { BarChart } from './components/BarChart'
import { Stats } from './components/Stats'
import { useSorter } from './hooks/useSorter'
import { Bubble } from './algorithms/bubble'

function randomArray(length: number, min = 1, max = 100): number[] {
  const arr: number[] = []
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return arr
}

function App() {
  const [size, setSize] = useState<number>(40)
  const [baseArr, setBaseArr] = useState<number[]>(() => randomArray(40))

  const shuffle = useCallback((n: number) => {
    setBaseArr(randomArray(n))
  }, [])

  useEffect(() => {
    shuffle(size)
  }, [size, shuffle])

  const sorter = useSorter(Bubble.generate, baseArr, 150)

  const onShuffle = useCallback(() => {
    shuffle(size)
  }, [shuffle, size])

  const onSizeChange = useCallback((n: number) => {
    setSize(n)
  }, [])

  const onPlayPause = useCallback(() => {
    if (!sorter.playing && sorter.status === 'Sorted') {
      sorter.reset(sorter.array.slice())
    }
    sorter.setPlaying(!sorter.playing)
  }, [sorter])

  const onSpeedChange = useCallback((n: number) => {
    sorter.setSpeedMs(n)
  }, [sorter])

  return (
    <div className="container">
      <div className="panel">
        <Controls
          playing={sorter.playing}
          onPlayPause={onPlayPause}
          onStep={sorter.stepOnce}
          onShuffle={onShuffle}
          size={size}
          onSizeChange={onSizeChange}
          speedMs={sorter.speedMs}
          onSpeedChange={onSpeedChange}
        />
        <BarChart data={sorter.array} highlight={sorter.highlight} />
        <Stats comparisons={sorter.comparisons} swaps={sorter.swaps} status={sorter.status} />
      </div>
    </div>
  )
}

export default App
