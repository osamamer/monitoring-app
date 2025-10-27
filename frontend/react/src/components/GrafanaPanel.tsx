import {useState} from "react";

interface GrafanaPanelProps {
    title: string;
    description: string;
    computerId: string;
    metric: string;
    panelId: string;
    unit: string;
}

export const GrafanaPanel: React.FC<GrafanaPanelProps> = ({
                                                              title,
                                                              description,
                                                              computerId,
                                                              metric,
                                                              panelId,
                                                              unit
                                                          }) => {
    const [isLoading, setIsLoading] = useState(true);

    const baseUrl = "http://localhost:3000/d-solo/adc8n7m/influxdbqc";
    const params = new URLSearchParams({
        orgId: "1",
        from: "now-5m",
        to: "now",
        timezone: "utc",
        panelId: panelId,
        "var-comp_id": computerId,
        "var-metric": metric,
        "var-unit": unit,
        refresh: "5s",
        "__feature.dashboardSceneSolo": "true",
        "kiosk": "tv"
    });

    const url = `${baseUrl}?${params.toString()}`;

    const handleLoad = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    };

    return (
        <div className="grafana-panel">
            <h3 className="text-3xl font-bold text-blue-600">{title}</h3>
            <p>{description}</p>

            <div className="relative" style={{ height: '400px' }}>
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-card border border-dark-border rounded-2xl z-10">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-400 text-sm">Loading panel...</p>
                    </div>
                )}
                <iframe
                    className="bg-dark-card border border-dark-border rounded-2xl shadow-lg"
                    src={url}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    onLoad={handleLoad}
                    style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
                />
            </div>
        </div>
    );
};