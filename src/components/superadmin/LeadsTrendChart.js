"use client";

import { useMemo, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SERIES_COLORS = ["#2563eb", "#ef4444", "#10b981", "#f59e0b", "#7c3aed", "#db2777", "#0891b2", "#65a30d"];

const getLeadDate = (lead) => {
    const rawDate = lead.createdAt || lead.created_at || lead.date || lead.timestamp;
    if (!rawDate) return null;

    const date = new Date(rawDate);
    return Number.isNaN(date.getTime()) ? null : date;
};

const buildWeeklyData = (dates) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(now.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + index);

        const prevDay = new Date(currentDay);
        prevDay.setDate(currentDay.getDate() - 7);

        const currentKey = currentDay.toISOString().slice(0, 10);
        const previousKey = prevDay.toISOString().slice(0, 10);

        let current = 0;
        let previous = 0;

        dates.forEach((date) => {
            const dateKey = date.toISOString().slice(0, 10);
            if (dateKey === currentKey) current += 1;
            if (dateKey === previousKey) previous += 1;
        });

        return {
            name: currentDay.toLocaleDateString("en-US", { weekday: "short" }),
            current,
            previous,
        };
    });
};

const buildAllTimeMonthlyData = (dates) => {
    if (!dates.length) return [];

    const sortedDates = [...dates].sort((a, b) => a - b);
    const firstLeadDate = sortedDates[0];
    const start = new Date(firstLeadDate.getFullYear(), firstLeadDate.getMonth(), 1);
    const end = new Date();
    const data = [];

    for (
        let cursor = new Date(start);
        cursor <= end;
        cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
    ) {
        const monthKey = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
        const total = dates.reduce((count, date) => {
            const dateMonthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            return count + (dateMonthKey === monthKey ? 1 : 0);
        }, 0);

        data.push({
            name: cursor.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
            leads: total,
            fullLabel: cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        });
    }

    return data;
};

const buildYearComparisonData = (dates, yearsToCompare) => {
    const data = MONTH_LABELS.map((month, monthIndex) => {
        const row = { name: month, monthIndex };

        yearsToCompare.forEach((year) => {
            const key = `year_${year}`;
            row[key] = dates.reduce((count, date) => {
                return count + (date.getFullYear() === year && date.getMonth() === monthIndex ? 1 : 0);
            }, 0);
        });

        return row;
    });

    return {
        data,
    };
};

const buildYearlyTotalsData = (dates) => {
    if (!dates.length) return [];

    const totalsByYear = dates.reduce((accumulator, date) => {
        const year = date.getFullYear();
        accumulator[year] = (accumulator[year] || 0) + 1;
        return accumulator;
    }, {});

    return Object.keys(totalsByYear)
        .sort((a, b) => Number(a) - Number(b))
        .map((year) => ({
            name: year,
            leads: totalsByYear[year],
        }));
};

const CustomTooltip = ({ active, payload, label, mode }) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[180px]">
            <p className="text-sm font-semibold text-gray-900 mb-2">
                {mode === "comparison" ? `Month: ${label}` : label}
            </p>
            <div className="flex flex-col gap-1.5">
                {payload.map((entry) => (
                    <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            ></span>
                            <span className="text-gray-600">{entry.name}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LeadsTrendChart = ({ leads = [], type = "monthly" }) => {
    const [mode, setMode] = useState(type === "weekly" ? "weekly" : "allTime");
    const [selectedComparisonYears, setSelectedComparisonYears] = useState([]);
    const normalizedDates = useMemo(
        () => leads.map(getLeadDate).filter(Boolean),
        [leads]
    );

    const availableYears = useMemo(() => {
        return [...new Set(normalizedDates.map((date) => date.getFullYear()))].sort((a, b) => a - b);
    }, [normalizedDates]);

    const currentYear = useMemo(() => {
        if (!availableYears.length) return null;
        return availableYears[availableYears.length - 1];
    }, [availableYears]);

    const comparisonYears = useMemo(() => {
        if (!availableYears.length) return [];

        const validSelectedYears = selectedComparisonYears.filter((year) =>
            availableYears.includes(year)
        );

        if (!currentYear) return validSelectedYears;

        const years = validSelectedYears.includes(currentYear)
            ? validSelectedYears
            : [...validSelectedYears, currentYear];

        if (years.length === 1) {
            const previousYear = [...availableYears]
                .reverse()
                .find((year) => year !== currentYear);

            if (previousYear) {
                years.push(previousYear);
            }
        }

        return [...new Set(years)].sort((a, b) => a - b);
    }, [availableYears, currentYear, selectedComparisonYears]);

    const toggleComparisonYear = (year) => {
        if (year === currentYear) return;

        setSelectedComparisonYears((previousYears) => {
            if (previousYears.includes(year)) {
                return previousYears.filter((item) => item !== year);
            }

            return [...previousYears, year].sort((a, b) => a - b);
        });
    };

    const chartConfig = useMemo(() => {
        if (mode === "weekly") {
            return {
                title: "Weekly Comparison (Current vs Previous)",
                subtitle: "Shows the current week against the previous week.",
                data: buildWeeklyData(normalizedDates),
                lines: [
                    { key: "current", label: "Current Week", color: SERIES_COLORS[0] },
                    { key: "previous", label: "Previous Week", color: SERIES_COLORS[1] },
                ],
            };
        }

        if (mode === "allTime") {
            return {
                title: "All-Time Monthly Lead Trend",
                subtitle: "Every month from the first website lead up to now.",
                data: buildAllTimeMonthlyData(normalizedDates),
                lines: [
                    { key: "leads", label: "Monthly Leads", color: SERIES_COLORS[0] },
                ],
            };
        }

        if (mode === "comparison") {
            if (!currentYear) {
                return {
                    title: "Monthly Year Comparison",
                    subtitle: "Compare the current year with all previous years.",
                    data: [],
                    lines: [],
                };
            }

            const yearsToCompare = comparisonYears;
            const comparison = buildYearComparisonData(normalizedDates, yearsToCompare);

            return {
                title: `Monthly Comparison (${currentYear} vs Previous Years)`,
                subtitle: "Each line is a full year, so you can compare the same month across selected years.",
                data: comparison.data,
                lines: yearsToCompare.map((year, index) => ({
                    key: `year_${year}`,
                    label: year === currentYear ? `${year} (Current Year)` : `${year}`,
                    color: SERIES_COLORS[index % SERIES_COLORS.length],
                })),
            };
        }

        return {
            title: "Yearly Lead Totals",
            subtitle: "Total leads collected in each year since the start.",
            data: buildYearlyTotalsData(normalizedDates),
            lines: [
                { key: "leads", label: "Yearly Leads", color: SERIES_COLORS[0] },
            ],
        };
    }, [availableYears, comparisonYears, currentYear, mode, normalizedDates]);

    const hasData = chartConfig.data.some((item) =>
        chartConfig.lines.some((line) => (item[line.key] ?? 0) > 0)
    );

    const detailStats = useMemo(() => {
        if (!hasData) return [];

        if (mode === "comparison") {
            return chartConfig.lines.map((line) => {
                const total = chartConfig.data.reduce((sum, item) => sum + (item[line.key] ?? 0), 0);
                const peakMonth = chartConfig.data.reduce((best, item) => {
                    const value = item[line.key] ?? 0;
                    if (!best || value > best.value) {
                        return { label: item.name, value };
                    }
                    return best;
                }, null);

                return {
                    label: line.label,
                    total,
                    peakMonth: peakMonth?.label ?? "-",
                    peakValue: peakMonth?.value ?? 0,
                    color: line.color,
                };
            });
        }

        if (mode === "allTime") {
            const total = chartConfig.data.reduce((sum, item) => sum + (item.leads ?? 0), 0);
            const peakMonth = chartConfig.data.reduce((best, item) => {
                const value = item.leads ?? 0;
                if (!best || value > best.value) {
                    return { label: item.fullLabel ?? item.name, value };
                }
                return best;
            }, null);

            return [
                {
                    label: "All-Time Trend",
                    total,
                    peakMonth: peakMonth?.label ?? "-",
                    peakValue: peakMonth?.value ?? 0,
                    color: SERIES_COLORS[0],
                    helper: `${chartConfig.data.length} months tracked`,
                },
            ];
        }

        if (mode === "yearly") {
            const peakYear = chartConfig.data.reduce((best, item) => {
                const value = item.leads ?? 0;
                if (!best || value > best.value) {
                    return { label: item.name, value };
                }
                return best;
            }, null);

            return [
                {
                    label: "Yearly Totals",
                    total: chartConfig.data.reduce((sum, item) => sum + (item.leads ?? 0), 0),
                    peakMonth: peakYear?.label ?? "-",
                    peakValue: peakYear?.value ?? 0,
                    color: SERIES_COLORS[0],
                    helper: `${chartConfig.data.length} years tracked`,
                },
            ];
        }

        return [];
    }, [chartConfig.data, chartConfig.lines, hasData, mode]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col gap-4 mb-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{chartConfig.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{chartConfig.subtitle}</p>
                </div>

                {type !== "weekly" && (
                    <div className="flex flex-col gap-3 sm:items-end">
                        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                            {[
                                { key: "allTime", label: "All Time" },
                                { key: "comparison", label: "Compare" },
                                { key: "yearly", label: "Yearly" },
                            ].map((item) => (
                                <button
                                    key={item.key}
                                    onClick={() => setMode(item.key)}
                                    className={`px-3 py-1 text-sm rounded-md transition ${
                                        mode === item.key
                                            ? "bg-white shadow text-blue-600 font-semibold"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {mode === "comparison" && currentYear && (
                            <div className="flex flex-col gap-2 sm:items-end">
                                <label className="text-sm text-gray-500">
                                    Comparing <span className="font-semibold text-gray-700">{currentYear}</span> with selected previous years
                                </label>
                                <select
                                    multiple
                                    value={comparisonYears.map(String)}
                                    onChange={(event) => {
                                        const values = Array.from(event.target.selectedOptions, (option) => Number(option.value));
                                        setSelectedComparisonYears(values);
                                    }}
                                    className="min-w-[220px] px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {availableYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}{year === currentYear ? " (Current Year)" : ""}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-400">
                                    Hold Ctrl or Cmd to select multiple years. The current year stays included.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {chartConfig.lines.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
                    {chartConfig.lines.map((line) => (
                        <div key={line.key} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: line.color }}
                            ></div>
                            <span>{line.label}</span>
                        </div>
                    ))}
                </div>
            )}

            {detailStats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
                    {detailStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: stat.color }}
                                ></span>
                                <p className="text-sm font-semibold text-gray-800">{stat.label}</p>
                            </div>
                            <p className="text-xs text-gray-500">Total Leads</p>
                            <p className="text-lg font-bold text-gray-900">{stat.total}</p>
                            <p className="text-xs text-gray-500 mt-2">Peak Period</p>
                            <p className="text-sm font-medium text-gray-800">
                                {stat.peakMonth} ({stat.peakValue})
                            </p>
                            {stat.helper && (
                                <p className="text-xs text-gray-400 mt-2">{stat.helper}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {mode === "comparison" && availableYears.length > 1 && (
                <div className="mb-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Choose years to compare</p>
                            <p className="text-xs text-gray-500">
                                The latest year stays locked so you always compare current performance against past years.
                            </p>
                        </div>
                        <div className="text-xs text-gray-500">
                            Showing {comparisonYears.length} year{comparisonYears.length === 1 ? "" : "s"}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {availableYears.map((year) => {
                            const isCurrentYear = year === currentYear;
                            const isSelected = comparisonYears.includes(year);

                            return (
                                <button
                                    key={year}
                                    type="button"
                                    onClick={() => toggleComparisonYear(year)}
                                    disabled={isCurrentYear}
                                    className={`px-3 py-2 rounded-full border text-sm transition ${
                                        isCurrentYear
                                            ? "border-blue-600 bg-blue-600 text-white cursor-default"
                                            : isSelected
                                                ? "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    {year}
                                    {isCurrentYear ? " Current" : ""}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {!hasData ? (
                <div className="flex items-center justify-center h-72 text-gray-400 text-sm">
                    No lead data available for this view
                </div>
            ) : (
                <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartConfig.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" allowDecimals={false} />
                            <Tooltip content={<CustomTooltip mode={mode} />} />
                            <Legend />
                            {chartConfig.lines.map((line) => (
                                <Line
                                    key={line.key}
                                    type="monotone"
                                    dataKey={line.key}
                                    name={line.label}
                                    stroke={line.color}
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 4 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default LeadsTrendChart;
