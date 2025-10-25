import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
from models.metric import Metric
from typing import List

class InfluxDBService:
    def __init__(self, url: str, token: str, bucket: str, org: str):
        self.client = influxdb_client.InfluxDBClient(url, token, org)
        self.write_api = self.client.write_api(write_options=SYNCHRONOUS)
        self.bucket = bucket
        self.org = org

    def write_metric(self, metric: Metric) -> None:
        point = influxdb_client.Point(metric.metric_name) \
            .tag("computer_id", metric.computer_id) \
            .field("value", metric.value) \
            .field("unit", metric.unit) \
            .time(metric.timestamp)

        self.write_api.write(bucket=self.bucket, org=self.org, record=point)

    def write_metrics(self, metrics: List[Metric]) -> None:
        points = []
        for metric in metrics:
            point = influxdb_client.Point(metric.metric_name) \
                .tag("computer_id", metric.computer_id) \
                .field("value", metric.value) \
                .field("unit", metric.unit) \
                .time(metric.timestamp)
            points.append(point)
        # TODO: try writing them separately
        self.write_api.write(bucket=self.bucket, org=self.org, record=points)

    def close(self) -> None:
        self.client.close()

