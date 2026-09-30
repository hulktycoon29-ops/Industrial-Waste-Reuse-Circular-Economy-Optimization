export const scenarios = [
  { id: 'fly-ash', name: 'Fly ash', source: 'Ravenbrook Thermal Plant', location: 'Pittsburgh, PA', qty: 1840, unit: 't/mo', composition: 'Class F · 3.2% LOI', baseline: 42, color: '#9af5b3', tag: 'High fit', description: 'Fine mineral residue from coal combustion, suitable for cementitious and mine-backfill applications.' },
  { id: 'slag', name: 'Steel slag', source: 'Lakefront Steel Works', location: 'Gary, IN', qty: 920, unit: 't/mo', composition: 'Basic oxygen furnace', baseline: 31, color: '#f3be68', tag: '2 pathways', description: 'Dense aggregate stream with recoverable iron and road-base potential.' },
  { id: 'tailings', name: 'Mine tailings', source: 'Northstar Copper Mine', location: 'Butte, MT', qty: 5200, unit: 't/mo', composition: 'Silica · 0.4% Cu', baseline: 18, color: '#8cdde0', tag: 'Review', description: 'Fine-grained mineral material requiring moisture and chemistry validation before reuse.' },
  { id: 'gypsum', name: 'Recovered gypsum', source: 'Metro Demolition Hub', location: 'Baltimore, MD', qty: 680, unit: 't/mo', composition: '92% CaSO₄', baseline: 27, color: '#d7c6ff', tag: 'Fast lane', description: 'Recovered board gypsum screened for contaminants and ready for wallboard feedstock.' }
];

export const matches = [
  { id: 1, scenario: 'fly-ash', pathway: 'Low-carbon cement blend', buyer: 'Civic Materials Co.', city: 'Cleveland, OH', fit: 96, capacity: 1200, distance: 132, transport: 14.2, processing: 8.5, value: 38, emissions: -62, status: 'Ready', route: 'I-76 E · 2h 24m', requirement: 'Class F ash, LOI < 5%, dry bulk delivery', note: 'Strong chemistry fit. Buyer has an open October intake window.' },
  { id: 2, scenario: 'fly-ash', pathway: 'Mine backfill additive', buyer: 'Iron Ridge Mining', city: 'Erie, PA', fit: 91, capacity: 700, distance: 98, transport: 11.6, processing: 4.1, value: 27, emissions: -48, status: 'Ready', route: 'I-90 E · 1h 48m', requirement: 'Moisture < 12%, particle size 90% < 75μm', note: 'Closest outlet with a flexible receiving schedule.' },
  { id: 3, scenario: 'fly-ash', pathway: 'Geopolymer paver feedstock', buyer: 'TerraForm Surfaces', city: 'Columbus, OH', fit: 78, capacity: 420, distance: 202, transport: 20.9, processing: 12.8, value: 44, emissions: -35, status: 'Review', route: 'I-70 W · 3h 12m', requirement: 'Reactive SiO₂ > 45%, low unburnt carbon', note: 'Higher value application, but lab validation is still outstanding.' },
  { id: 4, scenario: 'fly-ash', pathway: 'Blended aggregate', buyer: 'Midwest Roads JV', city: 'Youngstown, OH', fit: 84, capacity: 560, distance: 118, transport: 12.9, processing: 6.6, value: 31, emissions: -43, status: 'Ready', route: 'US-422 E · 2h 06m', requirement: 'Dry bulk, no free water, consistent grading', note: 'Can accept split loads during weekday windows.' },
  { id: 5, scenario: 'slag', pathway: 'Road base aggregate', buyer: 'CountyWorks Infrastructure', city: 'Fort Wayne, IN', fit: 93, capacity: 850, distance: 174, transport: 17.8, processing: 6.2, value: 34, emissions: -55, status: 'Ready', route: 'I-90 W · 2h 51m', requirement: 'Aged slag, expansion < 1%, graded 0–2 in', note: 'Requires 90-day aging certificate.' }
];

export const navItems = [
  { id: 'overview', label: 'Overview', icon: '⌂' },
  { id: 'streams', label: 'Waste streams', icon: '◌' },
  { id: 'matches', label: 'Reuse matches', icon: '↗' },
  { id: 'allocation', label: 'Allocation', icon: '◫' },
  { id: 'methodology', label: 'Methodology', icon: '⌁' }
];

export function getMatches(scenarioId) {
  const found = matches.filter(m => m.scenario === scenarioId);
  return found.length ? found : matches.filter(m => m.scenario === 'fly-ash');
}

export function calcMetrics(scenario, allocation, selectedMatches) {
  const total = scenario.qty;
  const allocated = Object.values(allocation).reduce((a, b) => a + Number(b || 0), 0);
  const routes = selectedMatches.filter(m => allocation[m.id] > 0);
  const transport = routes.reduce((sum, m) => sum + (allocation[m.id] * m.transport), 0);
  const processing = routes.reduce((sum, m) => sum + (allocation[m.id] * m.processing), 0);
  const avoided = Math.max(0, allocated * scenario.baseline);
  const reuseValue = routes.reduce((sum, m) => sum + (allocation[m.id] * m.value), 0);
  const emissions = routes.reduce((sum, m) => sum + (allocation[m.id] * m.emissions), 0);
  return { total, allocated, unallocated: Math.max(0, total - allocated), transport, processing, avoided, reuseValue, emissions, netCost: transport + processing - reuseValue };
}
