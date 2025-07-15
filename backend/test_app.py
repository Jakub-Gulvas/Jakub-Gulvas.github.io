import unittest
from app import app

class SearchEndpointTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_search_success(self):
        response = self.app.get('/search?q=rubberduck')
        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)

        for item in data:
            self.assertIn("url", item)
            self.assertIsInstance(item["url"], str)

    def test_search_missing_query(self):
        response = self.app.get('/search')
        self.assertEqual(response.status_code, 400)

        data = response.get_json()
        self.assertIn("error", data)
        self.assertEqual(data["error"], "Missing query")

if __name__ == '__main__':
    unittest.main()
