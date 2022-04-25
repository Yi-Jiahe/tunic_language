mkdir tunic_language_lambda_package
pip install --target ./tunic_language_lambda_package nltk
python -m nltk.downloader -d ./tunic_language_lambda_package/nltk_data cmudict punkt
cp -r ./mappings ./tunic_language_lambda_package/mappings
cp main.py ./tunic_language_lambda_package/main.py
cp lambda_function.py ./tunic_language_lambda_package/lambda_function.py
tar -a -c -f tunic_language_lambda_package.zip tunic_language_lambda_package
#rm -rf ./tunic_language_lambda_package