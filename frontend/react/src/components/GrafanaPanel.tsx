interface GrafanaPanelProps {
    title: string;
    description: string;
    computerId: string;
    metric: string;
    panelId: string;
}

export const GrafanaPanel: React.FC<GrafanaPanelProps> = ({
                                                       title,
                                                       description,
                                                       computerId,
                                                       metric,
                                                       panelId
                                                   }) => {
    // "http://localhost:3000/d-solo/adh48br/influxdbqc?orgId=1&from=1761383174188&to=1761404774188&
    // timezone=utc&var-comp_id=qc-003&var-query0=&var-metric=temperature&panelId=1&__feature.dashboardSceneSolo=true"
    const baseUrl = "http://localhost:3000/d-solo/adh48br/influxdbqc";
    const params = new URLSearchParams({
        orgId: "1",
        from: "now-10m",
        to: "now",
        timezone: "utc",
        panelId: "panel-1",
        "var-comp_id": computerId,
        "var-metric": metric,
        refresh: "5s",
        "__feature.dashboardSceneSolo": "true"
    });

    const url = `${baseUrl}?${params.toString()}`;
    console.log(url)
    return (

        <div className="grafana-panel">
            <h3 className="text-3xl font-bold text-blue-600">{title}</h3>
            <p>{description}</p>

                <iframe
                    className="bg-dark-card border border-dark-border rounded-2xl shadow-lg"
                    src={url}
                    width="100%"
                    height="400"
                    frameBorder="0"
                />
            </div>
            );
            };