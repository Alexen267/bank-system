for i in {module, controller, service}; do
	nest g $i auth;
done
