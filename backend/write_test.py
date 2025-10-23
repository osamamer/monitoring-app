from services.influxdb_service import InfluxDBService
from models.metric import Metric
from datetime import datetime

# Create service
influx = InfluxDBService(
    url="http://localhost:8086",
    token="my-super-secret-token",
    org="lrz",
    bucket="quantum_metrics"
)

# Create test metric
test_metric = Metric(
    timestamp=datetime.now(),
    computer_id="test-123",
    metric_name="test_metric",
    value=99.9,
    unit="test"
)

try:
    influx.write_metric(test_metric)
    print("✅ SUCCESS! Metric written to InfluxDB")
except Exception as e:
    print(f"❌ ERROR: {e}")
finally:
    influx.close()