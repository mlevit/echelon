---
hide:
  - navigation
---

# Entity Constant Name

|value|cast|required|comment|
|----|----|----|----|
|blank_as_null|boolean|false|Loads blank fields, which consist of only white space characters, as NULL.|
|ceiling_guardrail|integer|false|Largest acceptable value after deviation.|
|column_delimiter|char(5)|false|The character(s) used to delimit the file.|
|column_quote_character|char(1)|false|The character(s) used to quote values.|
|control_file_path|text|false|Path to the control file.|
|control_file_pattern|text|false|Regular expression pattern of the control file used to find the files in the above path.|
|control_file_server|text|false|Server where the control file is stored. For AWS this is the S3 bucket, for GCP this is the Cloud Storage bucket, for on-premises this is the DNS or IP address of the file server.|
|data_file_path|text|false|Path to the data file.|
|data_file_pattern|text|false|Regular expression pattern of the data file used to find the files in the above path.|
|data_file_server|text|false|Server where the data file is stored. For AWS this is the S3 bucket, for GCP this is the Cloud Storage bucket, for on-premises this is the DNS or IP address of the file server.|
|database_name|text|false|Database name used within connection string.|
|database_port|integer|false|Database port number used within connection string.|
|database_server|text|false|Database host/IP used within connection string.|
|date_format|text|false|Format of the date used to convert the extract date into a date object. The format should match the one expected by the ETL tool.|
|date_pattern|text|false|Regular expression pattern of the data file used to find the files in the above path.|
|empty_as_null|boolean|false|Loads empty fields, which do not consist of any characters, as NULL.|
|end_of_transmision_file_path|text|false|Path to the end of transmission file.|
|end_of_transmision_file_pattern|text|false|Regular expression pattern of the end of transmission file used to find the files in the above path.|
|end_of_transmision_file_server|text|false|Server where the end of transmission file is stored. For AWS this is the S3 bucket, for GCP this is the Cloud Storage bucket, for on-premises this is the DNS or IP address of the file server.|
|extract_job|text|false|Fully qualified name of the job that will extract the data from the source entity.|
|floor_guardrail|integer|false|Smallest acceptable value after deviation.|
|hash_diff_column_name|text|false|Name of the column that stores the MD5 checksum of the concatenated non-primary key columns.|
|hash_function|text|false|Hash function used to create a hash of the original value for checksum purposes.|
|hash_key_column_name|text|false|Name of the column that stores the MD5 checksum of the concatenated primary key columns.|
|header_count|integer|false|Number of rows at the beginning of the file that should be ignored.|
|header_count_end_range|integer|false|End index of the file count header field.|
|header_count_start_range|integer|false|Start index of the file count header field.|
|header_date_end_range|text|false|End index of the file date header field.|
|header_date_start_range|text|false|Start index of the file date header field.|
|html_file_path|text|false|Fully qualified name of the HTML file that will be produced by the data profiling operation.|
|html_file_server|text|false|Server where the control file is stored. For AWS this is the S3 bucket, for GCP this is the Cloud Storage bucket, for on-premises this is the DNS or IP address of the file server.|
|json_schema|text|false|JSON schema to be used by the ETL tool to parse the file. If not present `json_schema_file_path` is required.|
|json_schema_file_path|text|false|Path to the JSON schema file. If not present json_schema is required.|
|load_job|text|false|Fully qualified name of the job that will load the data into the target entity.|
|max_diviation|integer|false|Numeric value of the maximum deviation required.|
|min_diviation|integer|false|Numeric value of the minimum deviation required.|
|notebook_file_path|text|false|Fully qualified name of the Jupyter Notebook file that will be produced by the data profiling operation.|
|notebook_file_server|text|false|Server where the control file is stored. For AWS this is the S3 bucket, for GCP this is the Cloud Storage bucket, for on-premises this is the DNS or IP address of the file server.|
|orchestration_job|text|false|Fully qualified name of the job that will orchestrate the source file load.|
|read_view|text|false|Default database view used for reading from the database table.|
|replace_pattern|text|false|Pattern used to replace characters selected by the select_pattern.|
|schema_name|text|false|Database schema name of the database table.|
|seed_provider|text|false|Provider name based on your selected fake data library.|
|select_pattern|text|false|Regular expression pattern used to select the text to mask (e.g., `^d{12}` to select the first 12 numbers of a credit card number).|
|surrogate_key_column_name|text|false|Database table column name of the surrogate key column.|
|table_name|text|false|Database table name.|
|table_view|text|false|Database table name.|
|token_pattern|text|false|Regular expression pattern used to generate a unique token whos pattern matches the original value (e.g., `d{16}` for credit card numbers).|
|trailer_count|integer|false|Number of rows at the end of the file that should be ignored.|
|transform_job|text|false|Fully qualified name of the job that will transform the extracted data from the source entity.|
|transform_sql|text|false|For instances where a view cannot be created, SQL transformation logic for the job can be stored here.|
|transform_view|text|false|View that contains transformation logic for the job.|
|trim_blanks|boolean|false|Removes the trailing white space characters.|
|watermark_field|text|false|Field used for pipeline checkpointing.|
|xml_schema|text|false||
|xml_schema_file_path|text|false||

